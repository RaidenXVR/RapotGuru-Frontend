import Sidebar from './components/Sidebar';
import SchoolProfile from './components/SchoolProfile';
import './index.css';
import TeacherProfile from './components/TeacherProfile';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
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
import ExtrasEdit from './components/ExtrasEdit';
import StudentsEdit from './components/StudentsEdit';
import SubjectMarksEdit from './components/SubjectMarksEdit';
import NotesEdit from './components/NotesEdit';
import ReportEdit from './components/ReportEdit';
import CardPreviewPage from './components/CardPreviewPage';
import Login from './components/Login';
import RegisterPage from './components/Register';

export default function App() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          const data = await getUserData(parsedUser.nip);
          setUser(data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setUser]);

  useEffect(() => {
    if (location.pathname === '/login') {
      setLoading(false);
      return;
    }
  }, [location.pathname]);


  if (loading) return <div>Fetching user data...</div>;
  if (error) return <div>{error}</div>;

  if (!user &&
    location.pathname !== '/login' &&
    location.pathname !== '/register') {
    return <Navigate to="/login" replace />;
  }
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
                  <div className="flex flex-row w-full h-fit">
                    <SchoolProfile />
                    <TeacherProfile />
                  </div>
                  <ReportHistory />
                </div>
              }
            />
            <Route path='login'
              element={user ? <Navigate to="/" replace /> : <Login />}
            />
            <Route path='register'
              element={<RegisterPage />}
            />
            <Route path="profile" element={<Outlet />}>
              <Route index element={<ProfileEdit />} />
              <Route path="new-school" element={<EditSchoolProfile />} />
              <Route path="edit-school" element={<EditSchoolProfile />} />
              <Route path="edit-teacher" element={<TeacherProfileEdit />} />
            </Route>
            <Route path="report-cards" element={<Outlet />}>
              <Route index element={<ReportCards />} />
              <Route path='new' element={<Outlet />}>
                <Route index element={<ReportEdit />} />
              </Route>
              <Route path='edit' element={<Outlet />}>
                <Route index element={<ReportEdit />} />
              </Route>
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
                <Route path='subject-marks' element={<Outlet />}>
                  <Route index element={<SubjectMarksEdit />} />
                </Route>
                <Route path='notes' element={<Outlet />}>
                  <Route index element={<NotesEdit />} />
                </Route>
                <Route path='print' element={<Outlet />}>
                  <Route index element={<CardPreviewPage />} />
                </Route>

              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
