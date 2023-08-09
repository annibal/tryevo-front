import { ACCOUNT_FEATURES } from "./AuthContext";

import WorkIcon from "@mui/icons-material/Work";
import SupportIcon from "@mui/icons-material/Support";
import InfoIcon from "@mui/icons-material/Info";
import PaymentsIcon from "@mui/icons-material/Payments";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SettingsIcon from "@mui/icons-material/Settings";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";

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
    auth: false,
  },
  sobre: {
    priority: 400,
    path: "sobre/",
    icon: <InfoIcon />,
    title: "Sobre",
    auth: false,
  },
  assinatura: {
    priority: 150,
    path: "assinatura/",
    icon: <PaymentsIcon />,
    title: "Assinaturas",
    auth: false,
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
    endData: "vagasSalvas",
  },
  pfDados: {
    priority: 101,
    path: "pf/dados/",
    icon: <ManageAccountsIcon />,
    title: "Meus Dados",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    endData: "missingInfo",
  },
  pfCandidaturas: {
    priority: 104,
    path: "pf/candidaturas/",
    icon: <HandshakeIcon />,
    title: "Candidaturas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    endData: "activeProposals",
  },
  pfNovaCandidatura: {
    priority: 104,
    path: "pf/nova-candidatura/",
    icon: <HandshakeIcon />,
    title: "Nova Candidatura",
    rules: [
      ACCOUNT_FEATURES.LOGGED,
      ACCOUNT_FEATURES.PF,
      ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR,
    ],
  },
  pfConfiguracoes: {
    priority: 200,
    path: "pf/configuracoes/",
    icon: <SettingsIcon />,
    title: "Configurações",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    endData: "highlightSettings",
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
  pjMinhaVaga: {
    priority: 102,
    path: "pj/minha-vaga/",
    icon: <BookmarkIcon />,
    title: "Minha Vaga",
    rules: [
      ACCOUNT_FEATURES.LOGGED,
      ACCOUNT_FEATURES.PJ,
      ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR,
    ],
  },
  pjNovaMinhaVaga: {
    priority: 102,
    path: "pj/nova-vaga/",
    icon: <BookmarkAddIcon />,
    title: "Nova Vaga",
    rules: [
      ACCOUNT_FEATURES.LOGGED,
      ACCOUNT_FEATURES.PJ,
      ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR,
    ],
  },
  pjEditarMinhaVaga: {
    priority: 102,
    path: "pj/editar-vaga/",
    icon: <BookmarkBorderIcon />,
    title: "Editar Vaga",
    rules: [
      ACCOUNT_FEATURES.LOGGED,
      ACCOUNT_FEATURES.PJ,
      ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR,
    ],
  },
  pjDados: {
    priority: 101,
    path: "pj/dados/",
    icon: <ManageAccountsIcon />,
    title: "Meus Dados",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
  },
  pjPropostasFeitas: {
    priority: 104,
    path: "pj/propostas/",
    icon: <HandshakeIcon />,
    title: "Propostas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
  },
  pjPropostaFeita: {
    priority: 104,
    path: "pj/proposta/",
    icon: <HandshakeIcon />,
    title: "Proposta",
    rules: [
      ACCOUNT_FEATURES.LOGGED,
      ACCOUNT_FEATURES.PJ,
      ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR,
    ],
  },
  pjConfiguracoes: {
    priority: 200,
    path: "pj/configuracoes/",
    icon: <SettingsIcon />,
    title: "Configurações",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
  },
};

export const masterAdminRoutes = {
  masterAdminHome: {
    priority: 100,
    path: "master-admin/home/",
    icon: <HomeIcon />,
    title: "Master Admin Home",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
  },
  masterAdminCBO: {
    priority: 101,
    path: "master-admin/cbo/",
    icon: <ArticleIcon />,
    title: "Gerenciar CBOs",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
  },
}

const allRoutesData = {
  ...commonRoutes,
  ...pessoaFisicaRoutes,
  ...pessoaJuridicaRoutes,
  ...masterAdminRoutes,
};

export const allRoutesArray = Object.entries(allRoutesData)
  .map((entry) => ({
    ...entry[1],
    key: entry[0],
  }))
  .sort((a, b) => a.priority - b.priority);

export default allRoutesData;
