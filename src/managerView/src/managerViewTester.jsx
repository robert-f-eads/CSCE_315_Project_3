import { translateText } from "../../databaseConnections/managerViewFunctions";
import ManagerHome from "./managerHome";

function ManagerViewTester() {
  translateText('please translate this fast', 'en', 'es').then(res => {
    console.log(res)
  });
  return (
    <>
      <ManagerHome />
    </>
  );
}

export default ManagerViewTester;