/**
 *项目路由文件
 *管理整个项目的路由
 */

 import Vue from 'vue'
 import vueRouter from 'vue-router'

 import Login from '@/components/Login'
 import NotFind from '@/components/NotFind'
 import Register from '@/components/Register'
 import Home from '@/home/Home'
 import FindPassword from '@/components/FindPassword'
 import ContentText from '@/home/ContentText'
 import JoinClass from '@/home/JoinClass'
 import CreateClass from '@/home/CreateClass'
 import Create from '@/create/Create'
 import AddFile from '@/addfile/AddFile'
 import NetFile from '@/addfile/NetFile'
 import LocalFile from '@/addfile/LocalFile'
 import SignIn from '@/sign/SignIn'
 import SignList from '@/sign/SignList'
 import ShowStudent from '@/sign/ShowStudent'
 import ShowAllStudent from '@/student/ShowAllStudent'
 import Join from '@/join/Join'
 import Qiangda from '@/respond/Qiangda'
 import Sign from '@/sign/Sign'
 import RespondBtn from '@/respond/RespondBtn'
 import Issue from '@/issue/Issue'
 import UpIssue from '@/issue/UpIssue'
 import ShowIssue from '@/issue/ShowIssue'

 Vue.use(vueRouter);

 export default new vueRouter({
   //   mode: 'history',
     routes: [
         {
             path: '/',
             redirect: '/login',
             component: Login
         },{
            path: '/login',
            component: Login
         },{
            path: '/register',
            component: Register
         },{
            path: '/home',
            component: Home,
            children: [
               {
                  path: "class-join",
                  component: Join,
                  children: [
                     {
                        path: 'add',
                        component: AddFile
                     },{
                        path: 'all-students',
                        component: ShowAllStudent
                     },{
                        path: 'sign-list',
                        component: SignList
                     },{
                        path: 'go-sign',
                        component: Sign
                     },{
                        path: 'qiangda',
                        component: RespondBtn
                     },{
                        path: 'issue',
                        component: Issue
                     },{
                        path: 'detail',
                        component: ShowIssue
                     }
                  ]
               },{
                  path: 'content',
                  component: ContentText
               },{
                  path: 'join',
                  component: JoinClass
               },{
                  path: 'create',
                  component: CreateClass
               },{
                  path: 'manage-create',
                  component: Create,
                  children: [
                     {
                        path: 'add',
                        component: AddFile
                     },{
                        path: 'all-students',
                        component: ShowAllStudent
                     },{
                        path: 'sign',
                        component: SignIn,
                     },{
                        path: 'sign-list',
                        component: SignList
                     },{  
                        path: 'students',
                        component: ShowStudent
                     },{
                        path: 'net',
                        component: NetFile
                     },{
                        path: 'local',
                        component: LocalFile
                     },{
                        path: 'qiangda',
                        component: Qiangda
                     },{
                        path: 'issue',
                        component: Issue
                     },{
                        path: 'up-issue',
                        component: UpIssue
                     }
                  ]
               }
            ]
         },{
            path: '/change',
            component: FindPassword
         },{
             path: '*',
             component: NotFind
         }
     ]
 })