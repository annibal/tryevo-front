
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
            path: allRoutesData.vagas.path + "/:vagaId/",
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
            path: allRoutesData.pfPropostas.path + "novaProposta/:vagaId",
            element: <ProtectedRoute><NovaPropostaPage /></ProtectedRoute>,
          },
          {
            element: <ProtectedRoute><DadosPage /></ProtectedRoute>,
            path: allRoutesData.pfDados.path,
          },
          {
            path: allRoutesData.pfConfiguracoes.path,
            element: <ProtectedRoute><ConfiguracoesPFPage /></ProtectedRoute>,
          },

          // pjDashboard
          // pjMinhasVagas
          // pjDados
          // pjPropostasFeitas
          // pjConfiguracoes

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
