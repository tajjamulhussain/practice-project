import AccessControl from "accesscontrol";
const ac = new AccessControl();
const roles = function () {
  ac.grant("user").readOwn("access");
  // ac.grant("supervisor").extend("user").readAny("access");
  ac.grant("admin")
    .extend("user")
    // .extend("supervisor")
    .updateAny("access")
    .deleteAny("access")
    .readAny("access");
  return ac;
};
export default roles;
