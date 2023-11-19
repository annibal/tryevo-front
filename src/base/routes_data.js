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
import SummarizeIcon from "@mui/icons-material/Summarize";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DiamondIcon from "@mui/icons-material/Diamond";
import { CurriculumIcon } from "../components/CustomIcons";

export const NAVBAR_PLACE = {
  NONE: "NONE",
  IS_LOGO: "IS_LOGO",
  START_SIDE: "START_SIDE",
  END_SIDE: "END_SIDE",
  UNDER_USER: "UNDER_USER",
  TOOLBAR: "TOOLBAR",
};

export const commonRoutes = {
  vagas: {
    priority: 302,
    path: "vagas/",
    icon: <WorkIcon />,
    title: "Vagas",
    rules: [ACCOUNT_FEATURES.NOT_LOGGED],
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
  login: {
    priority: 300,
    path: "log-in/",
    icon: <LoginIcon />,
    title: "Login",
    rules: [ACCOUNT_FEATURES.NOT_LOGGED],
    navbar: {
      place: NAVBAR_PLACE.END_SIDE,
      highlight: true,
    },
  },
  esqueciSenha: {
    priority: 300,
    path: "esqueci-a-senha/",
    icon: <LoginIcon />,
    title: "Esqueci a Senha",
    rules: [ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR],
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
  criarConta: {
    priority: 301,
    path: "criar-conta/",
    icon: <PersonAddIcon />,
    title: "Criar Conta",
    rules: [ACCOUNT_FEATURES.NOT_LOGGED],
    navbar: {
      place: NAVBAR_PLACE.END_SIDE,
    },
  },
  sair: {
    priority: 999,
    path: "sair/",
    icon: <LogoutIcon />,
    title: "Logout",
    rules: [ACCOUNT_FEATURES.LOGGED],
    navbar: {
      place: NAVBAR_PLACE.UNDER_USER,
    },
  },
  ajuda: {
    priority: 400,
    path: "ajuda/",
    icon: <SupportIcon />,
    title: "Ajuda",
    auth: false,
    rules: [ACCOUNT_FEATURES.NOT_LOGGED],
    navbar: {
      place: NAVBAR_PLACE.TOOLBAR,
    },
  },
  sobre: {
    priority: 400,
    path: "sobre/",
    icon: <InfoIcon />,
    title: "Sobre",
    auth: false,
    rules: [ACCOUNT_FEATURES.NOT_LOGGED],
    navbar: {
      place: NAVBAR_PLACE.TOOLBAR,
    },
  },
  assinatura: {
    priority: 150,
    path: "assinatura/",
    icon: <PaymentsIcon />,
    title: "Assinaturas",
    auth: false,
    rules: [ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR],
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
};

export const pessoaFisicaRoutes = {
  pfDashboard: {
    priority: 100,
    path: "pf/dashboard/",
    icon: <DashboardIcon />,
    title: "Dashboard",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    navbar: {
      place: NAVBAR_PLACE.IS_LOGO,
    },
  },
  pfVagas: {
    priority: 102,
    path: "vagas/",
    icon: <WorkIcon />,
    title: "Vagas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    navbar: {
      place: NAVBAR_PLACE.START_SIDE,
    },
  },
  pfVagasSalvas: {
    priority: 103,
    path: "pf/vagas-salvas/",
    icon: <BookmarksIcon />,
    title: "Vagas Salvas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    // endData: "vagasSalvas",
    navbar: {
      place: NAVBAR_PLACE.UNDER_USER,
    },
  },
  pfDados: {
    priority: 101,
    path: "pf/dados/",
    icon: <ManageAccountsIcon />,
    title: "Meus Dados",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    // endData: "missingInfo",
    navbar: {
      place: NAVBAR_PLACE.UNDER_USER,
    },
  },
  pfCurriculoCompleto: {
    priority: 200,
    path: "pf/curriculo-completo/",
    icon: <CurriculumIcon />,
    title: "Currículo Completo",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    navbar: {
      place: NAVBAR_PLACE.UNDER_USER,
    },
  },
  pfCandidaturas: {
    priority: 104,
    path: "pf/candidaturas/",
    icon: <HandshakeIcon />,
    title: "Candidaturas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    // endData: "activeProposals",
    navbar: {
      place: NAVBAR_PLACE.START_SIDE,
    },
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
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
  pfConfiguracoes: {
    priority: 200,
    path: "pf/configuracoes/",
    icon: <SettingsIcon />,
    title: "Configurações",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    // endData: "highlightSettings",
    navbar: {
      place: NAVBAR_PLACE.TOOLBAR,
    },
  },
  pfAjuda: {
    priority: 400,
    path: "ajuda/",
    icon: <SupportIcon />,
    title: "Ajuda",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    navbar: {
      place: NAVBAR_PLACE.TOOLBAR,
    },
  },
  pfSobre: {
    priority: 400,
    path: "sobre/",
    icon: <InfoIcon />,
    title: "Sobre",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    navbar: {
      place: NAVBAR_PLACE.TOOLBAR,
    },
  },
  pfAssinatura: {
    priority: 150,
    path: "assinatura/",
    icon: <PaymentsIcon />,
    title: "Assinaturas",
    rules: [ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR],
    // rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PF],
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
};

export const pessoaJuridicaRoutes = {
  pjDashboard: {
    priority: 100,
    path: "pj/dashboard/",
    icon: <DashboardIcon />,
    title: "Dashboard",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
    navbar: {
      place: NAVBAR_PLACE.IS_LOGO,
    },
  },
  pjMinhasVagas: {
    priority: 102,
    path: "pj/minhas-vagas/",
    icon: <BookmarksIcon />,
    title: "Minhas Vagas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
    navbar: {
      place: NAVBAR_PLACE.START_SIDE,
    },
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
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
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
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
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
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
  pjDados: {
    priority: 101,
    path: "pj/dados/",
    icon: <ManageAccountsIcon />,
    title: "Meus Dados",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
    navbar: {
      place: NAVBAR_PLACE.UNDER_USER,
    },
  },
  pjPropostasFeitas: {
    priority: 104,
    path: "pj/propostas/",
    icon: <HandshakeIcon />,
    title: "Propostas",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
    navbar: {
      place: NAVBAR_PLACE.START_SIDE,
    },
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
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
  pjConfiguracoes: {
    priority: 200,
    path: "pj/configuracoes/",
    icon: <SettingsIcon />,
    title: "Configurações",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
    navbar: {
      place: NAVBAR_PLACE.TOOLBAR,
    },
  },
  pjAjuda: {
    priority: 400,
    path: "ajuda/",
    icon: <SupportIcon />,
    title: "Ajuda",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
    navbar: {
      place: NAVBAR_PLACE.TOOLBAR,
    },
  },
  pjSobre: {
    priority: 400,
    path: "sobre/",
    icon: <InfoIcon />,
    title: "Sobre",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
    navbar: {
      place: NAVBAR_PLACE.TOOLBAR,
    },
  },
  pjAssinatura: {
    priority: 150,
    path: "assinatura/",
    icon: <PaymentsIcon />,
    title: "Assinaturas",
    rules: [ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR],
    // rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
  pjCurriculoCompleto: {
    priority: 500,
    path: "pj/curriculo-completo/",
    icon: <CurriculumIcon />,
    title: "Currículo Completo",
    rules: [ACCOUNT_FEATURES.LOGGED, ACCOUNT_FEATURES.PJ],
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
};

export const masterAdminRoutes = {
  masterAdminHome: {
    priority: 100,
    path: "master-admin/home/",
    icon: <HomeIcon />,
    title: "Master Admin Home",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
    navbar: {
      place: NAVBAR_PLACE.IS_LOGO,
    },
  },
  masterAdminPlanosAssinatura: {
    priority: 102,
    path: "master-admin/planos-assinatura/",
    icon: <DiamondIcon />,
    title: "Planos de Assinatura",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
    navbar: {
      place: NAVBAR_PLACE.START_SIDE,
      group: "Cadastros",
    },
  },
  masterAdminPlanoAssinatura: {
    priority: 199,
    path: "master-admin/plano-assinatura/",
    icon: <DiamondIcon />,
    title: "Plano de Assinatura",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
    navbar: {
      place: NAVBAR_PLACE.NONE
    },
  },
  masterAdminNovoPlanoAssinatura: {
    priority: 199,
    path: "master-admin/novo-plano-assinatura/",
    icon: <DiamondIcon />,
    title: "Novo Plano de Assinatura",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
    navbar: {
      place: NAVBAR_PLACE.NONE
    },
  },
  masterAdminHabilidades: {
    priority: 104,
    path: "master-admin/habilidades/",
    icon: <SummarizeIcon />,
    title: "Habilidades",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
    navbar: {
      place: NAVBAR_PLACE.START_SIDE,
      group: "Cadastros",
    },
  },
  masterAdminCBO: {
    priority: 106,
    path: "master-admin/cbo/",
    icon: <ArticleIcon />,
    title: "CBOs",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
    navbar: {
      place: NAVBAR_PLACE.START_SIDE,
      group: "Cadastros",
    },
  },
  masterAdminCompetencias: {
    priority: 108,
    path: "master-admin/competencias/",
    icon: <LocalOfferIcon />,
    title: "Competências",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
    navbar: {
      place: NAVBAR_PLACE.START_SIDE,
      group: "Cadastros",
    },
  },
  masterAdminUsuarios: {
    priority: 200,
    path: "master-admin/usuarios/",
    icon: <AdminPanelSettingsIcon />,
    title: "Todos os Usuários",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
    navbar: {
      place: NAVBAR_PLACE.START_SIDE,
      group: "Listas",
    },
  },
  masterAdminUsuario: {
    priority: 200,
    path: "master-admin/usuario/",
    icon: <AdminPanelSettingsIcon />,
    title: "Gerenciar Usuário",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN, ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR],
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
  masterAdminVagas: {
    priority: 202,
    path: "master-admin/vagas/",
    icon: <WorkIcon />,
    title: "Todas as Vagas",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN],
    navbar: {
      place: NAVBAR_PLACE.START_SIDE,
      group: "Listas",
    },
  },
  masterAdminVaga: {
    priority: 202,
    path: "master-admin/vaga/",
    icon: <WorkIcon />,
    title: "Gerenciar Vaga",
    rules: [ACCOUNT_FEATURES.MASTER_ADMIN, ACCOUNT_FEATURES.IGNORE_ON_SIDEBAR],
    navbar: {
      place: NAVBAR_PLACE.NONE,
    },
  },
};

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
