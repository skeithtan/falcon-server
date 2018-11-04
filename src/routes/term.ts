import * as Router from "koa-router";
import TermController from "../controllers/term";
import TermView from "../views/term";

const termView = new TermView(new TermController());
export default new Router()
    .prefix("/terms")
    .get("/", termView.getAll)
    .post("/", termView.add)
    .get("/:termId", termView.get)
    .get("/:termId/faculty-members", termView.getFacultyMembers)
    .get("/:termId/my-schedules", termView.getMySchedule)
    .post("/:termId/my-schedules/time-constraints", termView.setTimeConstraints)
    .get("/:termId/class-schedules", termView.getClassSchedules)
    .post("/:termId/class-schedules", termView.addClassSchedule)
    .post("/auto-assign", termView.autoAssign)
    .post("/advance", termView.advance)
    .post("/regress", termView.regress);
