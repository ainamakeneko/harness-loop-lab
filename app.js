export function createTimer(now = Date.now) {
  let activeSession = null;
  const completedSessions = [];

  return {
    start(taskName) {
      const task = taskName.trim();

      if (!task) return { error: "Enter a task name before starting." };
      if (activeSession) return { error: "Stop the current session before starting another." };

      activeSession = { task, startedAt: now() };
      return { activeSession: { ...activeSession } };
    },

    stop() {
      if (!activeSession) return { error: "There is no active session to stop." };

      const session = {
        ...activeSession,
        durationMs: Math.max(0, now() - activeSession.startedAt),
      };
      activeSession = null;
      completedSessions.unshift(session);
      return { session: { ...session } };
    },

    getState() {
      return {
        activeSession: activeSession ? { ...activeSession } : null,
        completedSessions: completedSessions.map((session) => ({ ...session })),
        totalDurationMs: completedSessions.reduce((total, session) => total + session.durationMs, 0),
      };
    },
  };
}

export function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  if (totalSeconds < 60) return `${totalSeconds} sec`;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return seconds ? `${minutes} min ${seconds} sec` : `${minutes} min`;
}

const form = typeof document === "undefined" ? null : document.querySelector("#timer-form");

if (form) {
  const timer = createTimer();
  const taskInput = document.querySelector("#task-name");
  const startButton = document.querySelector("#start-button");
  const stopButton = document.querySelector("#stop-button");
  const error = document.querySelector("#error");
  const active = document.querySelector("#active-session");
  const activeTask = document.querySelector("#active-task");
  const sessionList = document.querySelector("#session-list");
  const emptyList = document.querySelector("#empty-list");
  const total = document.querySelector("#total-duration");

  function render() {
    const state = timer.getState();
    active.hidden = !state.activeSession;
    activeTask.textContent = state.activeSession?.task ?? "";
    taskInput.disabled = Boolean(state.activeSession);
    startButton.disabled = Boolean(state.activeSession);
    stopButton.disabled = !state.activeSession;
    emptyList.hidden = state.completedSessions.length > 0;
    total.textContent = formatDuration(state.totalDurationMs);
    sessionList.replaceChildren(
      ...state.completedSessions.map((session) => {
        const item = document.createElement("li");
        const name = document.createElement("strong");
        const duration = document.createElement("span");
        name.textContent = session.task;
        duration.textContent = formatDuration(session.durationMs);
        item.append(name, duration);
        return item;
      }),
    );
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = timer.start(taskInput.value);
    error.textContent = result.error ?? "";
    render();
  });

  stopButton.addEventListener("click", () => {
    const result = timer.stop();
    error.textContent = result.error ?? "";
    if (!result.error) taskInput.value = "";
    render();
    taskInput.focus();
  });

  render();
}
