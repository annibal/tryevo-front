
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

import VagasSalvasPage from "../pages/pf/VagasSalvasPage";
import VagaPage from "../pages/pf/VagaPage";
import DadosPage from "../pages/dados/DadosPage";
import DashboardPFPage from "../pages/pf/DashboardPFPage";
import PropostasPage from "../pages/pf/proposta/PropostasPage";
import PropostaPage from "../pages/pf/proposta/PropostaPage";
import NovaPropostaPage from "../pages/pf/proposta/NovaPropostaPage";
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


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
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
            element: <VagasPage />,
          },
          {
            path: allRoutesData.vagas.path + ":vagaId",
            element: <VagaPage />,
          },
          {
            path: allRoutesData.vagas.path + ":vagaId/:vagaNome",
            element: <VagaPage />,
          },
          {
            path: allRoutesData.login.path,
            element: <LoginPage />,
          },
          {
            path: allRoutesData.esqueciSenha.path,
            element: <ForgotPasswordPage />,
          },
          {
            path: allRoutesData.criarConta.path,
            element: <CriarContaPage />,
          },
          {
            path: allRoutesData.sair.path,
            element: <ProtectedRoute><LogoutPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.ajuda.path,
            element: <AjudaPage />,
          },
          {
            path: allRoutesData.sobre.path,
            element: <SobrePage />,
          },
          {
            path: allRoutesData.assinatura.path,
            element: <AssinaturaPage />,
          },

          
          {
            path: allRoutesData.pfDashboard.path,
            element: <ProtectedRoute><DashboardPFPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfVagasSalvas.path,
            element: <ProtectedRoute><VagasSalvasPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfPropostas.path,
            element: <ProtectedRoute><PropostasPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfPropostas.path + ":propostaId",
            element: <ProtectedRoute><PropostaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfPropostas.path + ":propostaId/:vagaNome",
            element: <ProtectedRoute><PropostaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfNovaProposta.path + ":vagaId",
            element: <ProtectedRoute><NovaPropostaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfNovaProposta.path + ":vagaId/:vagaNome",
            element: <ProtectedRoute><NovaPropostaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfDados.path,
            element: <ProtectedRoute><DadosPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pfConfiguracoes.path,
            element: <ProtectedRoute><ConfiguracoesPFPage /></ProtectedRoute>,
          },

          // pjMinhasVagas
          // pjPropostasFeitas
          {
            path: allRoutesData.pjDashboard.path,
            element: <ProtectedRoute><DashboardPJPage /></ProtectedRoute>,
          },
          // {
          //   element: <ProtectedRoute><DadosPage /></ProtectedRoute>,
          //   path: allRoutesData.pfDados.path,
          //   // same as pfDados
          // },
          {
            path: allRoutesData.pjMinhasVagas.path,
            element: <ProtectedRoute><MinhasVagasPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjMinhaVaga.path + ":vagaId",
            element: <ProtectedRoute><MinhaVagaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjMinhaVaga.path + ":vagaId/:vagaNome",
            element: <ProtectedRoute><MinhaVagaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjNovaMinhaVaga.path,
            element: <ProtectedRoute><NovaMinhaVagaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjEditarMinhaVaga.path + ":vagaId",
            element: <ProtectedRoute><EditarMinhaVagaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjEditarMinhaVaga.path + ":vagaId/:vagaNome",
            element: <ProtectedRoute><EditarMinhaVagaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjPropostasFeitas.path,
            element: <ProtectedRoute><PropostasFeitasPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjPropostaFeita.path + ":propostaId",
            element: <ProtectedRoute><PropostaFeitaPage /></ProtectedRoute>,
          },
          {
            path: allRoutesData.pjConfiguracoes.path,
            element: <ProtectedRoute><ConfiguracoesPJPage /></ProtectedRoute>,
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
