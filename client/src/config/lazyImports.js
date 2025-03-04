import { lazy } from "react";
const Auth = {
    Login: lazy(() => import("../pages/Login/Login")),
    Signup: lazy(() => import("../pages/Signup/Signup")),
    GoogleLogin: lazy(() => import("../components/Login/GoogleLogin/GoogleLogin")),
    ForgotPassword: lazy(() => import("../components/Login/ForgotPassword/ForgotPassword")),
    PasswordReset: lazy(() => import("../components/Login/ForgotPassword/PasswordReset")),
    VerifyCode: lazy(() => import("../components/Login/ForgotPassword/VerifyCode")),
    SetNewPassword: lazy(() => import("../components/Login/ForgotPassword/SetNewPassword")),
  };
  
  const Settings = {
    Profile: lazy(() => import("../components/Settings/Profile/Profile")),
    Admin: lazy(() => import("../components/Settings/Admin/Admin")),
    ProjectManager: lazy(() => import("../components/Settings/ProjectManager/ProjectManager")),
    Client: lazy(() => import("../components/Settings/Client/Client")),
    Subcontractor: lazy(() => import("../components/Settings/Subcontractor/Subcontractor")),
    SupplierList: lazy(() => import("../components/Settings/SupplierList/SupplierList")),
    MasterLineItem: lazy(() => import("../components/Settings/MasterLineItem/MasterLineItem")),
    Accounts: lazy(() => import("../components/Settings/Accounts/Accounts")),
    Others: lazy(() => import("../components/Settings/Others/Others")),
    Employee: lazy(() => import("../components/Settings/Employee/Employee")),
    Units: lazy(() => import("../components/Settings/Units/Units")),
    Coupon: lazy(() => import("../components/Settings/Cupon/Coupon")),
  };
  
  const Projects = {
    Default: lazy(() => import("../components/Projects/ProjectsDefault/ProjectsDefault")),
    ChatViewMain: lazy(() => import("../components/Projects/ProjectsChat/ChatViewMain")),
    Chat: lazy(() => import("../components/Projects/ProjectsChat/Chat")),
    InvoicesView: lazy(() => import("../components/Projects/ProjectInvoices/ProjectInvoicesView")),
    WorkOrderView: lazy(() => import("../components/Projects/ProjectsWorkOrder/WorkOrderView")),
    NotesView: lazy(() => import("../components/Projects/ProjectNotes/NotesView")),
    ChangeOrder: lazy(() => import("../pages/Projects/ChangeOrder")),
    InitialProposalView: lazy(() => import("../components/Projects/ProjectsInitialProposal/InitialProposalView")),
    Table: lazy(() => import("../pages/Projects/ProjectsTable")),
    ImagesView: lazy(() => import("../components/Projects/ProjectsImages/ImagesView")),
    PermitView: lazy(() => import("../components/Projects/ProjectsPermit/PermitView")),
    DrawingFilesView: lazy(() => import("../components/Projects/ProjectsDrawingFiles/DrawingFilesView")),
    PermissionsView: lazy(() => import("../components/Projects/ProjectPermissions/ProjectPermissionsView")),
    ReportView: lazy(() => import("../components/Projects/ProjectsReport/ReportView")),
  };
  
  const Dashboard = {
    Main: lazy(() => import("../pages/Dashboard/Dashboard")),
    ClientCards: lazy(() => import("../components/ClientDashboard/ClientDashboardCards/ClientDashboardCards")),
    PermitClient: lazy(() => import("../components/ClientDashboard/Permit/Permit")),
    DailyLog: lazy(() => import("../components/ClientDashboard/DailyLog/DailyLog")),
    ClientImages: lazy(() => import("../components/ClientDashboard/Images/Images")),
    ClientDrawing: lazy(() => import("../components/ClientDashboard/Drawing/Drawing")),
  };
  
  const Layouts = {
    Layout1: lazy(() => import("../components/Layouts/Layout1")),
    Layout2: lazy(() => import("../components/Layouts/Layout2")),
    Layout3: lazy(() => import("../components/Layouts/Layout3")),
    InnerLayout2: lazy(() => import("../components/Layouts/InnerLayout2")),
    ClientLayout: lazy(() => import("../components/Layouts/ClientLayout")),
  };
  
  const Pages = {
    Invitation: lazy(() => import("../pages/InvitationView/Invitation")),
    Reports: lazy(() => import("../pages/Reports/ReportsPage")),
    AssignProject: lazy(() => import("../pages/AssignProject/AssignProject")),
    ConnectQuickBooks: lazy(() => import("../pages/QuickBookConnection/QuickBookConnectionPage")),
    Error: lazy(() => import("../pages/Error/Error")),
    NotFound: lazy(() => import("../pages/NotFound/NotFound")),
  };
  
  const Modals = {
    Completion: lazy(() => import("../components/dialogues/PaymentModal/Completion")),
    InvoicePayment: lazy(() => import("../components/dialogues/GenerateInvoice/InvoicePayment/InvoicePayment")),
  };
  
  
  export { Auth, Settings, Projects, Dashboard, Layouts, Pages, Modals };