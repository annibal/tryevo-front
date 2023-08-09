import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const AjudaPage = () => {
  const [expanded, setExpanded] = useState('faq-1');

  return (
    <>
      <Typography variant="h3" sx={{ mt: 2, mb: 4 }}>Perguntas e Respostas</Typography>

      <Accordion expanded={expanded === 'faq-1'} onChange={() => setExpanded('faq-1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="faq-1-content"
          id="faq-1-summary"
        >
          <Typography>1. O que é a TryEvo?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A TryEvo é uma plataforma digital de recrutamento que oferece
            serviços eficientes para empresas se conectarem com os melhores
            talentos.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'faq-2'} onChange={() => setExpanded('faq-2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="faq-2-content"
          id="faq-2-summary"
        >
          <Typography>
            2. Quais são os principais benefícios de utilizar a TryEvo?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ao utilizar a TryEvo, as empresas podem economizar tempo e recursos
            no processo de recrutamento, ter acesso a uma ampla base de dados de
            currículos, contar com ferramentas de avaliação personalizadas e
            melhorar a qualidade das contratações.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'faq-3'} onChange={() => setExpanded('faq-3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="faq-3-content"
          id="faq-3-summary"
        >
          <Typography>
            3. Como a TryEvo potencializa o processo de contratação?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A TryEvo potencializa o processo de contratação ao oferecer recursos
            automatizados, triagem de currículos, ferramentas de avaliação
            personalizadas e suporte especializado, permitindo que as empresas
            encontrem candidatos qualificados de forma ágil e eficiente.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'faq-4'} onChange={() => setExpanded('faq-4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="faq-4-content"
          id="faq-4-summary"
        >
          <Typography>
            4. A TryEvo é adequada para empresas de todos os tamanhos?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sim, a TryEvo é adequada para empresas de todos os tamanhos. Seja
            uma pequena empresa em crescimento ou uma grande corporação, a
            plataforma oferece soluções personalizadas para atender às
            necessidades específicas de cada empresa.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'faq-5'} onChange={() => setExpanded('faq-5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="faq-5-content"
          id="faq-5-summary"
        >
          <Typography>
            5. Como posso acessar a base de dados de currículos da TryEvo?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A TryEvo fornece acesso à sua ampla base de dados de currículos
            através da plataforma online. Após o registro e configuração da sua
            conta, você poderá explorar os currículos e entrar em contato
            diretamente com os candidatos de interesse.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'faq-6'} onChange={() => setExpanded('faq-6')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="faq-6-content"
          id="faq-6-summary"
        >
          <Typography>
            6. A TryEvo oferece suporte durante o processo de recrutamento?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sim, a TryEvo oferece suporte durante todo o processo de
            recrutamento. Nossa equipe especializada está disponível para
            fornecer orientações, esclarecer dúvidas e oferecer suporte técnico
            para garantir uma experiência positiva e bem-sucedida.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AjudaPage;
