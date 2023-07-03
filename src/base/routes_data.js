import WorkIcon from '@mui/icons-material/Work';
import SupportIcon from '@mui/icons-material/Support';
import InfoIcon from '@mui/icons-material/Info';
import PaymentsIcon from '@mui/icons-material/Payments';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SettingsIcon from '@mui/icons-material/Settings';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { ACCOUNT_FEATURES } from './AuthContext';

export const commonRoutes = {
  vagas: {
    priority: 302,
    path: "vagas/",
    icon: <WorkIcon />,
    title: "Vagas",
    rules: [ACCOUNT_FEATURES.NOT_LOGGED],
  },
  login: {
    priority: 300,
    path: "log-in/",
    icon: <LoginIcon />,
    title: "Login",
    rules: [ACCOUNT_FEATURES.NOT_LOGGED],
  },
  esqueciSenha: {
    priority: 300,
    path: "esqueci-a-senha/",
    icon: <LoginIcon />,
    title: "Esqueci a Senha",
    rules: [ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR],
  },
  criarConta: {
    priority: 301,
    path: "criar-conta/",
    icon: <PersonAddIcon />,
    title: "Criar Conta",
    rules: [ACCOUNT_FEATURES.NOT_LOGGED],
  },
  sair: {
    priority: 999,
    path: "sair/",
    icon: <LogoutIcon />,
    title: "Logout",
    rules: [ACCOUNT_FEATURES.LOGGED],
  },
  ajuda: {
    priority: 400,
    path: "ajuda/",
    icon: <SupportIcon />,
    title: "Ajuda",
    auth: false
  },
  sobre: {
    priority: 400,
    path: "sobre/",
    icon: <InfoIcon />,
    title: "Sobre",
    auth: false
  },
  assinatura: {
    priority: 150,
    path: "assinatura/",
    icon: <PaymentsIcon />,
    title: "Assinaturas",
    auth: false
  },
};

export const pessoaFisicaRoutes = {
  pfDashboard: {
    priority: 100,
    path: "pf/dashboard/",
    icon: <DashboardIcon />,
    title: "Dashboard",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
  },
  pfVagas: {
    priority: 102,
    path: "vagas/",
    icon: <WorkIcon />,
    title: "Vagas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
  },
  pfVagasSalvas: {
    priority: 103,
    path: "pf/vagas-salvas/",
    icon: <BookmarksIcon />,
    title: "Vagas Salvas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    endData: 'vagasSalvas',
  },
  pfDados: {
    priority: 101,
    path: "dados/",
    icon: <ManageAccountsIcon />,
    title: "Meus Dados",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    endData: 'missingInfo',
  },
  pfPropostas: {
    priority: 104,
    path: "pf/propostas/",
    icon: <HandshakeIcon />,
    title: "Propostas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    endData: 'activeProposals',
  },
  pfConfiguracoes: {
    priority: 200,
    path: "pf/configuracoes/",
    icon: <SettingsIcon />,
    title: "Configurações",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    endData: 'highlightSettings',
  },
};

export const pessoaJuridicaRoutes = {
  pjDashboard: {
    priority: 100,
    path: "pj/dashboard/",
    icon: <DashboardIcon />,
    title: "Dashboard",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
  },
  pjMinhasVagas: {
    priority: 102,
    path: "pj/minhas-vagas/",
    icon: <BookmarksIcon />,
    title: "Minhas Vagas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
  },
  pjDados: {
    priority: 101,
    path: "dados/",
    icon: <ManageAccountsIcon />,
    title: "Meus Dados",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
  },
  pjPropostasFeitas: {
    priority: 104,
    path: "pj/propostas-feitas/",
    icon: <HandshakeIcon />,
    title: "Propostas Feitas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
  },
  pjConfiguracoes: {
    priority: 200,
    path: "pj/configuracoes/",
    icon: <SettingsIcon />,
    title: "Configurações",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
  },
};


const allRoutesData = {
  ...commonRoutes,
  ...pessoaFisicaRoutes,
  ...pessoaJuridicaRoutes
}

export const allRoutesArray = Object.entries(allRoutesData).map((entry) => ({
  ...entry[1],
  key: entry[0]
})).sort((a,b) => a.priority - b.priority)

export default allRoutesData;