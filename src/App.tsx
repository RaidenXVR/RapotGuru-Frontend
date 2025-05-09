import Sidebar from './components/Sidebar';
import SchoolProfile from './components/SchoolProfile';
import './App.css';
import TeacherProfile from './components/TeacherProfile';
import { Route, Routes } from 'react-router-dom'
import ReportCards from './components/ReportCards';
import ReportHistory from './components/ReportHistory';
import SchoolProfileEdit from './components/SchoolProfileEdit';
import { useUser } from './context/userContext';
import { useEffect, useState } from 'react';
import { getUserData } from './api/schoolApi';
import EditSchoolProfile from './components/EditSchoolProfile';

export default function App() {
	const { setUser } = useUser();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getUserData('123456789')
			.then((data) => {
				console.log(data)
				setUser(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setError('Failed to load schools');
				setLoading(false);
			});
	}, []);


	if (loading) return <div>Fetching user data...</div>;
	if (error) return <div>{error}</div>;


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
						<ReportHistory />
					</div>} />
					<Route path='/school-profile' element={<SchoolProfileEdit />} />
					<Route path='/report-cards' element={<ReportCards />} />
					<Route path='/school-profile/new' element={<EditSchoolProfile />} />
					<Route path='/school-profile/edit' element={<EditSchoolProfile />} />
				</Routes>
			</div>
		</div>
	);
}
