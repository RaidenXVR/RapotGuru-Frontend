import Sidebar from './components/Sidebar';
import SchoolProfile from './components/SchoolProfile';
import './index.css';
import TeacherProfile from './components/TeacherProfile';
import { Outlet, Route, Routes } from 'react-router-dom'
import ReportCards from './components/ReportCards';
import ReportHistory from './components/ReportHistory';
import ProfileEdit from './components/ProfileEdit';
import { useUser } from './context/userContext';
import { useEffect, useState } from 'react';
import { getUserData } from './api/userApi';
import EditSchoolProfile from './components/EditSchoolProfile';
import TeacherProfileEdit from './components/TeacherProfileEdit';
import ReportCardEdit from './components/ReportCardEdit';
import SubjectsEdit from './components/SubjectsEdit';
import CPEdit from './components/CPEdit';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExtrasEdit from './components/ExtrasEdit';
import StudentsEdit from './components/StudentsEdit';

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
					<Route
						path="/"
						element={
							<div className="flex flex-col w-full h-full">
								{/* Shared layout components */}
								<Outlet />
							</div>
						}
					>
						<Route
							index
							element={
								<div>
									<div className="flex flex-row w-full h-full">
										<SchoolProfile />
										<TeacherProfile />
									</div>
									<ReportHistory />
								</div>
							}
						/>
						<Route path="profile" element={<Outlet />}>
							<Route index element={<ProfileEdit />} />
							<Route path="new-school" element={<EditSchoolProfile />} />
							<Route path="edit-school" element={<EditSchoolProfile />} />
							<Route path="edit-teacher" element={<TeacherProfileEdit />} />
						</Route>
						<Route path="report-cards" element={<Outlet />}>
							<Route index element={<ReportCards />} />
							<Route path="edit/:report_id" element={<Outlet />}>
								<Route index element={<ReportCardEdit />} />

								<Route path="subjects" element={<Outlet />}>
									<Route index element={<SubjectsEdit />} />
									<Route path="edit" element={<CPEdit />} />
								</Route>
								<Route path='extras' element={<Outlet />} >
									<Route index element={<ExtrasEdit />} />
								</Route>
								<Route path='students' element={<Outlet />}>
									<Route index element={<StudentsEdit />} />
								</Route>

							</Route>
						</Route>
					</Route>
				</Routes>
			</div>
		</div>
	);
}
