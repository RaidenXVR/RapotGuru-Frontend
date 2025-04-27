import Sidebar from './components/Sidebar';
import SchoolProfile from './components/SchoolProfile';
import './App.css';
import TeacherProfile from './components/TeacherProfile';
import ReportList from './components/ReportList';
import { Route, Routes } from 'react-router-dom'
import ReportCards from './components/ReportCards';

export default function App() {
	return (
		<div className='flex h-screen w-screen'>
			<Sidebar />
			<div className='flex-1 relative w-full bg-blue-100 overflow-y-scroll'>
				<Routes>
					<Route path='/' element={<div>
						<div className="flex flex-row w-full h-full">
							<SchoolProfile />
							<TeacherProfile />
						</div>
						<ReportList />
					</div>} />
					<Route path='/report-cards' element={<ReportCards />} />
				</Routes>
			</div>
		</div>
	);
}
