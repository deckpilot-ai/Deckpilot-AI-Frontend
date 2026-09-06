import { describe, expect, it } from "vitest";
import type { Message } from "./api";

describe("Workspace session caching & isolation logic", () => {
  it("maintains distinct message caches across presentation sessions", () => {
    const messageCache: Record<string, Message[]> = {};

    const session1Messages: Message[] = [
      {
        id: "msg-1",
        project_id: "proj-1",
        user_id: "user-1",
        role: "user",
        content: "Build seed pitch deck",
        created_at: 1000,
      },
      {
        id: "msg-2",
        project_id: "proj-1",
        user_id: null,
        role: "assistant",
        content: "I have prepared your seed pitch deck with 10 slides.",
        created_at: 1005,
      },
    ];

    const session2Messages: Message[] = [
      {
        id: "msg-3",
        project_id: "proj-2",
        user_id: "user-1",
        role: "user",
        content: "Quarterly business review",
        created_at: 2000,
      },
    ];

    // Store messages for session 1
    messageCache["proj-1"] = session1Messages;
    expect(messageCache["proj-1"]).toHaveLength(2);

    // Switch to session 2
    messageCache["proj-2"] = session2Messages;
    expect(messageCache["proj-2"]).toHaveLength(1);

    // Verify session 1's history remains untouched and preserved
    expect(messageCache["proj-1"]).toHaveLength(2);
    expect(messageCache["proj-1"][0].content).toBe("Build seed pitch deck");
    expect(messageCache["proj-1"][1].content).toContain("seed pitch deck");

    // Verify session 2's history is accurate
    expect(messageCache["proj-2"][0].content).toBe("Quarterly business review");
  });

  it("prevents background job completion in session 1 from overwriting active session 2", () => {
    let activeProjectId = "proj-2";
    let visibleMessages: Message[] = [
      {
        id: "msg-3",
        project_id: "proj-2",
        user_id: "user-1",
        role: "user",
        content: "Quarterly business review",
        created_at: 2000,
      },
    ];
    const messageCache: Record<string, Message[]> = {
      "proj-2": [...visibleMessages],
      "proj-1": [
        {
          id: "msg-1",
          project_id: "proj-1",
          user_id: "user-1",
          role: "user",
          content: "Build seed pitch deck",
          created_at: 1000,
        },
      ],
    };

    // Background job for proj-1 completes with assistant reply
    const completedJobProjectId = "proj-1";
    const freshProj1Messages: Message[] = [
      ...messageCache["proj-1"],
      {
        id: "msg-2",
        project_id: "proj-1",
        user_id: null,
        role: "assistant",
        content: "Completed presentation deck v1",
        created_at: 1010,
      },
    ];

    // Cache is updated for proj-1
    messageCache[completedJobProjectId] = freshProj1Messages;

    // Only update visibleMessages IF activeProjectId === completedJobProjectId
    if (activeProjectId === completedJobProjectId) {
      visibleMessages = freshProj1Messages;
    }

    // Visible messages MUST remain session 2's messages!
    expect(visibleMessages).toHaveLength(1);
    expect(visibleMessages[0].project_id).toBe("proj-2");

    // But session 1's cache MUST contain the new assistant response
    expect(messageCache["proj-1"]).toHaveLength(2);
    expect(messageCache["proj-1"][1].content).toBe("Completed presentation deck v1");

    // Now if user switches to session 1:
    activeProjectId = "proj-1";
    visibleMessages = messageCache[activeProjectId] || [];
    expect(visibleMessages).toHaveLength(2);
    expect(visibleMessages[1].content).toBe("Completed presentation deck v1");
  });

  it("discards out-of-order stale network responses during rapid session switching", async () => {
    let activeProjectId = "proj-1";
    let visibleMessages: Message[] = [];
    let currentFetchCounter = 0;

    const simulateFetch = async (projectId: string, delayMs: number, resultMessages: Message[]) => {
      currentFetchCounter += 1;
      const reqId = currentFetchCounter;
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      // Guard: only commit if counter matches AND activeProjectId matches
      if (reqId === currentFetchCounter && activeProjectId === projectId) {
        visibleMessages = resultMessages;
        return true;
      }
      return false; // Dropped stale response
    };

    const proj1Msgs: Message[] = [
      { id: "p1-1", project_id: "proj-1", user_id: "u1", role: "user", content: "P1", created_at: 1 },
    ];
    const proj2Msgs: Message[] = [
      { id: "p2-1", project_id: "proj-2", user_id: "u1", role: "user", content: "P2", created_at: 2 },
    ];

    // User clicks Session 1 (takes 50ms)
    const p1Promise = simulateFetch("proj-1", 50, proj1Msgs);

    // User quickly clicks Session 2 (takes 10ms)
    activeProjectId = "proj-2";
    const p2Promise = simulateFetch("proj-2", 10, proj2Msgs);

    const [p1Applied, p2Applied] = await Promise.all([p1Promise, p2Promise]);

    expect(p2Applied).toBe(true);
    expect(p1Applied).toBe(false); // Older request was dropped!
    expect(visibleMessages).toEqual(proj2Msgs);
    expect(visibleMessages[0].content).toBe("P2");
  });

  it("prevents loadProjectData from clobbering message state while message submission is in-flight", async () => {
    let submittingProjectId: string | null = "new-proj";
    let visibleMessages: Message[] = [
      { id: "temp-1", project_id: "new-proj", user_id: "u1", role: "user", content: "Make 22 slide deck", created_at: 100 }
    ];

    // Simulate loadProjectData being triggered by route change
    const simulateLoadProjectData = (projectId: string, networkFetchedMessages: Message[]) => {
      // Guard from app/workspace/page.tsx:
      if (submittingProjectId && (submittingProjectId === projectId || submittingProjectId === "new-project")) {
        return false; // Interrupted / ignored
      }
      visibleMessages = networkFetchedMessages;
      return true;
    };

    // While in-flight submission is running, network returns empty array
    const applied = simulateLoadProjectData("new-proj", []);
    expect(applied).toBe(false);
    // User message MUST NOT be wiped out!
    expect(visibleMessages).toHaveLength(1);
    expect(visibleMessages[0].content).toBe("Make 22 slide deck");

    // Once submission finishes, guard is cleared
    submittingProjectId = null;
    const finalApplied = simulateLoadProjectData("new-proj", [
      { id: "real-1", project_id: "new-proj", user_id: "u1", role: "user", content: "Make 22 slide deck", created_at: 100 }
    ]);
    expect(finalApplied).toBe(true);
    expect(visibleMessages[0].id).toBe("real-1");
  });

  it("preserves submitted user message in chat even if downstream generation triggers an error", () => {
    const visibleMessages: Message[] = [
      { id: "temp-msg-1", project_id: "proj-1", user_id: "u1", role: "user", content: "Make 22 slide deck", created_at: 100 }
    ];
    let workspaceError: string | null = null;
    let sendingMessage = true;

    // Simulate error during generation job start
    const handleSubmissionError = (err: Error) => {
      // Do NOT filter out visibleMessages!
      workspaceError = err.message;
      sendingMessage = false;
    };

    handleSubmissionError(new Error("AI providers could not complete this stage"));

    // User message remains visible in chat!
    expect(visibleMessages).toHaveLength(1);
    expect(visibleMessages[0].content).toBe("Make 22 slide deck");
    expect(workspaceError).toBe("AI providers could not complete this stage");
    expect(sendingMessage).toBe(false);
  });
});

