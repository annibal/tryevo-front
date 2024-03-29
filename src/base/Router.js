
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import allRoutesData from "./routes_data";

import Redirect from "../components/Redirect";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";

import RootLayout from "../layout/RootLayout";
import PageLayout from "../layout/PageLayout";

import VagasPage from "../pages/VagasPage";

import AjudaPage from "../pages/commons/AjudaPage";
import CriarContaPage from "../pages/commons/CriarContaPage";
import LoginPage from "../pages/commons/LoginPage";
import LogoutPage from "../pages/commons/LogoutPage";
import SobrePage from "../pages/commons/SobrePage";
import AssinaturaPage from "../pages/commons/AssinaturaPage";
import AssinaturaSelectModoPagtoPage from "../pages/commons/AssinaturaSelectModoPagtoPage";
import AssinaturaFormPage from "../pages/commons/AssinaturaFormPage";

import VagasSalvasPage from "../pages/pf/VagasSalvasPage";
import VagaPage from "../pages/pf/VagaPage";
import DadosPage from "../pages/dados/DadosPage";
import DashboardPFPage from "../pages/pf/DashboardPFPage";
import CandidaturasPage from "../pages/pf/candidatura/CandidaturasPage";
import CandidaturaPage from "../pages/pf/candidatura/CandidaturaPage";
import NovaCandidaturaPage from "../pages/pf/candidatura/NovaCandidaturaPage";
import ConfiguracoesPFPage from "../pages/pf/ConfiguracoesPFPage";
import ForgotPasswordPage from "../pages/commons/ForgotPasswordPage";

import ConfiguracoesPJPage from "../pages/pj/ConfiguracoesPJPage";
import DashboardPJPage from "../pages/pj/DashboardPJPage";
import MinhasVagasPage from "../pages/pj/minhas-vagas/MinhasVagasPage";
import MinhaVagaPage from "../pages/pj/minhas-vagas/MinhaVagaPage";
import NovaMinhaVagaPage from "../pages/pj/minhas-vagas/NovaMinhaVagaPage";
import EditarMinhaVagaPage from "../pages/pj/minhas-vagas/EditarMinhaVagaPage";
import PropostasFeitasPage from "../pages/pj/PropostasFeitasPage";
import PropostaFeitaPage from "../pages/pj/PropostaFeitaPage";
import MasterAdminHome from "../pages/master-admin/MasterAdminHome";
import ManageCBO from "../pages/master-admin/ManageCBO";
import ManageHabilidades from "../pages/master-admin/ManageHabilidades";
import ManageCompetencias from "../pages/master-admin/ManageCompetencias";
import ManageAllUsers from "../pages/master-admin/ManageAllUsers";
import ManageSingleUser from "../pages/master-admin/ManageSingleUser";
import CurriculoCompletoPage from "../pages/pf/CurriculoCompletoPage";
import CurriculoCandidatoPage from "../pages/pj/CurriculoCandidatoPage";
import ManageAllVagas from "../pages/master-admin/ManageAllVagas";
import ManageSingleVaga from "../pages/master-admin/ManageSingleVaga";
import ManagePlanosAssinaturaPage from "../pages/master-admin/ManagePlanosAssinatura";
import ManageSinglePlanoAssinaturaPage from "../pages/master-admin/ManageSinglePlanoAssinatura";
import ManageNewPlanoAssinaturaPage from "../pages/master-admin/ManageNewPlanoAssinatura";
import AssinaturaViewDadosPage from "../pages/commons/AssinaturaViewDados/AssinaturaViewDadosPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "app/" + allRoutesData.pfCurriculoCompleto.path,
        handle: allRoutesData.pfCurriculoCompleto,
        element: <ProtectedRoute><CurriculoCompletoPage /></ProtectedRoute>,
      },
      {
        path: "app/" + allRoutesData.pjCurriculoCompleto.path + ":propostaId",
        handle: allRoutesData.pjCurriculoCompleto,
        element: <ProtectedRoute><CurriculoCandidatoPage /></ProtectedRoute>,
      },
      {
        path: "",
        element: <Redirect to={`/app/${allRoutesData.vagas.path}`} />
      },
      {
        path: "app/",
        element: <PageLayout />,
        children: [
          {
            path: "",
            element: <Redirect to={`/app/${allRoutesData.vagas.path}`} />
          },

          {
            path: allRoutesData.vagas.path,
            handle: allRoutesData.vagas,
            element: <VagasPage />,
          },
          {
            path: allRoutesData.vagas.path + ":vagaId",
            handle: allRoutesData.vagas,
            element: <VagaPage />,
          },
          {
            path: allRoutesData.vagas.path + ":vagaId/:vagaNome",
            handle: allRoutesData.vagas,
            element: <VagaPage />,
          },
          {
            path: allRoutesData.login.path,
            handle: allRoutesData.login,
            element: <LoginPage />,
          },
          {
            path: allRoutesData.esqueciSenha.path,
            handle: allRoutesData.esqueciSenha,
            element: <ForgotPasswordPage />,
          },
          {
            path: allRoutesData.criarConta.path,
            handle: allRoutesData.criarConta,
            element: <CriarContaPage />,
          },
          {
            path: allRoutesData.sair.path,
            handle: allRoutesData.sair,
            element: <ProtectedRoute><LogoutPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.ajuda.path,
            handle: allRoutesData.ajuda,
            element: <AjudaPage />,
          },
          {
            path: allRoutesData.sobre.path,
            handle: allRoutesData.sobre,
            element: <SobrePage />,
          },
          {
            path: allRoutesData.assinatura.path,
            handle: allRoutesData.assinatura,
            element: <AssinaturaPage />,
          },
          {
            path: allRoutesData.assinatura.path + ":planAssId",
            handle: allRoutesData.assinatura,
            element: <AssinaturaSelectModoPagtoPage />,
          },
          {
            path: allRoutesData.assinatura.path + ":planAssId/:pagbankGatewayId",
            handle: allRoutesData.assinatura,
            element: <AssinaturaFormPage />,
          },
          {
            path: allRoutesData.minhaAssinatura.path,
            handle: allRoutesData.minhaAssinatura,
            element: <AssinaturaViewDadosPage />,
          },

          
          {
            path: allRoutesData.pfDashboard.path,
            handle: allRoutesData.pfDashboard,
            element: <ProtectedRoute><DashboardPFPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfVagasSalvas.path,
            handle: allRoutesData.pfVagasSalvas,
            element: <ProtectedRoute><VagasSalvasPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfCandidaturas.path,
            handle: allRoutesData.pfCandidaturas,
            element: <ProtectedRoute><CandidaturasPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfCandidaturas.path + ":candidaturaId",
            handle: allRoutesData.pfCandidaturas,
            element: <ProtectedRoute><CandidaturaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfNovaCandidatura.path + ":vagaId",
            handle: allRoutesData.pfNovaCandidatura,
            element: <ProtectedRoute><NovaCandidaturaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfNovaCandidatura.path + ":vagaId/:vagaNome",
            handle: allRoutesData.pfNovaCandidatura,
            element: <ProtectedRoute><NovaCandidaturaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfDados.path,
            handle: allRoutesData.pfDados,
            element: <ProtectedRoute><DadosPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfConfiguracoes.path,
            handle: allRoutesData.pfConfiguracoes,
            element: <ProtectedRoute><ConfiguracoesPFPage /></ProtectedRoute>,
          },

          // pjMinhasVagas
          // pjPropostasFeitas
          {
            path: allRoutesData.pjDashboard.path,
            handle: allRoutesData.pjDashboard,
            element: <ProtectedRoute><DashboardPJPage /></ProtectedRoute>,
          },
          {
            element: <ProtectedRoute><DadosPage /></ProtectedRoute>,
            path: allRoutesData.pjDados.path,
            handle: allRoutesData.pjDados,
          },
          {
            path: allRoutesData.pjMinhasVagas.path,
            handle: allRoutesData.pjMinhasVagas,
            element: <ProtectedRoute><MinhasVagasPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjMinhaVaga.path + ":vagaId",
            handle: allRoutesData.pjMinhaVaga,
            element: <ProtectedRoute><MinhaVagaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjMinhaVaga.path + ":vagaId/:vagaNome",
            handle: allRoutesData.pjMinhaVaga,
            element: <ProtectedRoute><MinhaVagaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjNovaMinhaVaga.path,
            handle: allRoutesData.pjNovaMinhaVaga,
            element: <ProtectedRoute><NovaMinhaVagaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjEditarMinhaVaga.path + ":vagaId",
            handle: allRoutesData.pjEditarMinhaVaga,
            element: <ProtectedRoute><EditarMinhaVagaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjEditarMinhaVaga.path + ":vagaId/:vagaNome",
            handle: allRoutesData.pjEditarMinhaVaga,
            element: <ProtectedRoute><EditarMinhaVagaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjPropostasFeitas.path,
            handle: allRoutesData.pjPropostasFeitas,
            element: <ProtectedRoute><PropostasFeitasPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjPropostaFeita.path + ":propostaId",
            handle: allRoutesData.pjPropostaFeita,
            element: <ProtectedRoute><PropostaFeitaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjConfiguracoes.path,
            handle: allRoutesData.pjConfiguracoes,
            element: <ProtectedRoute><ConfiguracoesPJPage /></ProtectedRoute>,
          },

          // Master Admin
          {
            path: allRoutesData.masterAdminHome.path,
            handle: allRoutesData.masterAdminHome,
            element: <ProtectedRoute><MasterAdminHome /></ProtectedRoute>,
          },
          {
            path: allRoutesData.masterAdminCBO.path,
            handle: allRoutesData.masterAdminCBO,
            element: <ProtectedRoute><ManageCBO /></ProtectedRoute>,
          },
          {
            path: allRoutesData.masterAdminHabilidades.path,
            handle: allRoutesData.masterAdminHabilidades,
            element: <ProtectedRoute><ManageHabilidades /></ProtectedRoute>,
          },
          {
            path: allRoutesData.masterAdminCompetencias.path,
            handle: allRoutesData.masterAdminCompetencias,
            element: <ProtectedRoute><ManageCompetencias /></ProtectedRoute>,
          },
          {
            path: allRoutesData.masterAdminUsuarios.path,
            handle: allRoutesData.masterAdminUsuarios,
            element: <ProtectedRoute><ManageAllUsers /></ProtectedRoute>,
          },
          {
            path: allRoutesData.masterAdminUsuario.path + ":usuarioId",
            handle: allRoutesData.masterAdminUsuario,
            element: <ProtectedRoute><ManageSingleUser /></ProtectedRoute>,
          },
          {
            path: allRoutesData.masterAdminVagas.path,
            handle: allRoutesData.masterAdminVagas,
            element: <ProtectedRoute><ManageAllVagas /></ProtectedRoute>,
          },
          {
            path: allRoutesData.masterAdminVaga.path + ":vagaId",
            handle: allRoutesData.masterAdminVaga,
            element: <ProtectedRoute><ManageSingleVaga /></ProtectedRoute>,
          },
          {
            path: allRoutesData.masterAdminPlanosAssinatura.path,
            handle: allRoutesData.masterAdminPlanosAssinatura,
            element: <ProtectedRoute><ManagePlanosAssinaturaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.masterAdminPlanoAssinatura.path + ":planoId",
            handle: allRoutesData.masterAdminPlanoAssinatura,
            element: <ProtectedRoute><ManageSinglePlanoAssinaturaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.masterAdminNovoPlanoAssinatura.path,
            handle: allRoutesData.masterAdminNovoPlanoAssinatura,
            element: <ProtectedRoute><ManageNewPlanoAssinaturaPage /></ProtectedRoute>,
          },

          {
            path: "*",
            element: <ErrorPage />,
          }
        ]
      },
      {
        path: "*",
        element: <ErrorPage />,
      }
    ]
  },
]);

const Router = () => {

  return (
    <RouterProvider router={router} />
  )
}

export default Router;
