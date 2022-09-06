import HeaderComp from '../Components/HeaderComp'
import Sidebar from '../Components/Sidebar'
import './Dashboard.css'
import Widgets from '../Components/Widgets'
import Feed from '../Components/Feed'
import { useDispatch} from 'react-redux';
import { showDropDown } from '../app/features/settingsSlice';

const Dashboard = (props) => {

    let curruser = props.userdata[0]
    const dispatch = useDispatch();
  return (
   <>
   <HeaderComp userdata={curruser}/>
    <div 
    onClick={()=> dispatch(showDropDown(false))}
      className="dashboard__body">
        <Sidebar userdata={curruser}/>
        <Feed userdata={curruser}/>
        <Widgets/>
     </div>
   </>       
  )
}

export default Dashboard