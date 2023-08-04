import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useAuth } from "../../base/AuthContext";
import AlterarSenhaForm from "../../components/AlterarSenhaForm";
import Section from "../../components/Section";
import AlterarTipoContaForm from "../../components/AlterarTipoContaForm";

const ConfiguracoesPFPage = () => {
  const { features } = useAuth();

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 6 }}>
        Configurações do Candidato
      </Typography>

      <Section title="Recursos da Conta" withoutDivider>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Chave do Recurso</TableCell>
              <TableCell>Habilitado?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(features || {}).map((entry) => (
              <TableRow key={entry[0]}>
                <TableCell>{entry[0]}</TableCell>
                <TableCell>{entry[1] ? 'SIM' : 'NÃO'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      <Section title="Alterar Senha">
        <AlterarSenhaForm />
      </Section>

      <Section title="Alterar Tipo de Conta">
        <AlterarTipoContaForm />
      </Section>

      <Section title="Notificações" withoutDivider>
        - em construção -
      </Section>


    </Box>
  );
};

export default ConfiguracoesPFPage;
