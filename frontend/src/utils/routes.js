import Layout from '../components/Layout/Layout'
import ChangeEmailPage from '../pages/ChangeEmail/ChangeEmailPage'
import ChangePasswordPage from '../pages/ChangePassword/ChangePasswordPage'
import HomePage from '../pages/Home/HomePage'
import LoginPage from '../pages/Login/LoginPage'
import SignUpPage from '../pages/SignUp/SignUpPage'
import SearchPage from '../pages/Search/SearchPage'
import RequireNotAuth from './RequireNotAuth'
import RequireAuth from './RequireAuth'
import UserProfilePage from '../pages/UserProfile/UserProfilePage'
import AddPostPage from '../pages/AddPost/AddPostPage'
import CommentPage from '../pages/Comment/CommentPage'
import EditAccountPage from '../pages/EditAccount/EditAccountPage'
import FollowingsPage from '../pages/Followings/FollowingsPage'
import FollowersPage from '../pages/FollowersPage/FollowersPage'

export const routes = [
    {
        element: <RequireNotAuth />,
        children: [
            {
                path: 'signUp',
                element: <SignUpPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            }
        ]
    },
    {
        element: <RequireAuth children={<Layout />} />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: 'profile',
                element: <UserProfilePage />
            },
            {
                path: 'comment',
                element: <CommentPage />
            },
            {
                path: 'user-profile/:userId',
                element: <UserProfilePage />
            },
            {
                path: 'change-email',
                element: <ChangeEmailPage />
            },
            {
                path: 'change-password',
                element: <ChangePasswordPage />
            },
            {
                path: 'edit-account',
                element: <EditAccountPage />
            },
            {
                path: 'followings',
                element: <FollowingsPage />
            },,
            {
                path: 'followers',
                element: <FollowersPage />
            },
            {
                path: 'add-post',
                element: <AddPostPage />
            }
        ]
    }
]