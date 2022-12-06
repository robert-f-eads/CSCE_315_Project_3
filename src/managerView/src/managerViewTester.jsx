import { translateText } from "../../databaseConnections/managerViewFunctions";
import ManagerHome from "./managerHome";

function ManagerViewTester(props) {
  const {userData} = props;
  translateText('please translate this fast', 'en', 'es').then(res => {
    // console.log(res)
  });
  return (
    <>
      <ManagerHome userData={userData}/>
    </>
  );
}

export default ManagerViewTester;