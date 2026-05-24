package com.attus.debt_recovery.config;

import com.attus.debt_recovery.entity.Client;
import com.attus.debt_recovery.entity.Debt;
import com.attus.debt_recovery.entity.Debtor;
import com.attus.debt_recovery.entity.Proposals;
import com.attus.debt_recovery.repository.ClientRepository;
import com.attus.debt_recovery.repository.DebtRepository;
import com.attus.debt_recovery.repository.DebtorRepository;
import com.attus.debt_recovery.repository.ProposalsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ClientRepository clientRepository;
    private final DebtorRepository debtorRepository;
    private final DebtRepository debtRepository;
    private final ProposalsRepository proposalsRepository;

    @Override
    public void run(String... args) {
        if (clientRepository.count() == 0 && debtorRepository.count() == 0 && debtRepository.count() == 0) {
            seedDebts();
        }

        if (proposalsRepository.count() == 0 && debtRepository.count() > 0) {
            seedProposals();
        }
    }

    private void seedDebts() {
        List<Client> clients = clientRepository.saveAll(List.of(
                Client.builder()
                        .companyName("Attus Cobrancas LTDA")
                        .cnpj("12.345.678/0001-10")
                        .billingStreet("Avenida Paulista")
                        .billingNumber("1000")
                        .billingDistrict("Bela Vista")
                        .billingCity("Sao Paulo")
                        .billingState("SP")
                        .billingZipCode("01310-100")
                        .email("financeiro@attuscobrancas.com.br")
                        .contactName("Ana Carvalho")
                        .phone("(11) 3000-1000")
                        .build(),
                Client.builder()
                        .companyName("Alfa Tecnologia SA")
                        .cnpj("22.456.789/0001-20")
                        .billingStreet("Rua do Ouvidor")
                        .billingNumber("250")
                        .billingDistrict("Centro")
                        .billingCity("Rio de Janeiro")
                        .billingState("RJ")
                        .billingZipCode("20040-030")
                        .email("cobranca@alfatech.com.br")
                        .contactName("Marcos Lima")
                        .phone("(21) 3200-2200")
                        .build(),
                Client.builder()
                        .companyName("Beta Servicos Empresariais")
                        .cnpj("33.567.890/0001-30")
                        .billingStreet("Avenida Afonso Pena")
                        .billingNumber("1500")
                        .billingDistrict("Funcionarios")
                        .billingCity("Belo Horizonte")
                        .billingState("MG")
                        .billingZipCode("30130-005")
                        .email("recebiveis@betaservicos.com.br")
                        .contactName("Patricia Mendes")
                        .phone("(31) 3300-3300")
                        .build()
        ));

        List<Debtor> debtors = debtorRepository.saveAll(List.of(
                Debtor.builder()
                        .name("Joao Pereira")
                        .cpfCnpj("123.456.789-00")
                        .email("joao.pereira@email.com")
                        .phone("(11) 98888-1122")
                        .billingStreet("Rua Augusta")
                        .billingNumber("450")
                        .billingDistrict("Consolacao")
                        .billingCity("Sao Paulo")
                        .billingState("SP")
                        .billingZipCode("01305-000")
                        .build(),
                Debtor.builder()
                        .name("Maria Souza ME")
                        .cpfCnpj("12.345.678/0001-90")
                        .email("financeiro@mariasouza.com")
                        .phone("(21) 97777-3344")
                        .billingStreet("Rua das Laranjeiras")
                        .billingNumber("80")
                        .billingDistrict("Laranjeiras")
                        .billingCity("Rio de Janeiro")
                        .billingState("RJ")
                        .billingZipCode("22240-003")
                        .build(),
                Debtor.builder()
                        .name("Carlos Martins")
                        .cpfCnpj("987.654.321-00")
                        .email("carlos.martins@email.com")
                        .phone("(31) 96666-7788")
                        .billingStreet("Rua Curitiba")
                        .billingNumber("700")
                        .billingDistrict("Centro")
                        .billingCity("Belo Horizonte")
                        .billingState("MG")
                        .billingZipCode("30170-120")
                        .build()
        ));

        debtRepository.saveAll(List.of(
                Debt.builder()
                        .description("Contrato de prestacao de servicos")
                        .amount(new BigDecimal("12500.00"))
                        .dueDate(LocalDate.of(2026, 4, 10))
                        .status("VENCIDO")
                        .client(clients.get(0))
                        .debtor(debtors.get(0))
                        .build(),
                Debt.builder()
                        .description("Mensalidades em aberto")
                        .amount(new BigDecimal("3680.45"))
                        .dueDate(LocalDate.of(2026, 5, 30))
                        .status("PENDENTE")
                        .client(clients.get(1))
                        .debtor(debtors.get(1))
                        .build(),
                Debt.builder()
                        .description("Acordo renegociado")
                        .amount(new BigDecimal("8200.00"))
                        .dueDate(LocalDate.of(2026, 6, 15))
                        .status("NEGOCIADO")
                        .client(clients.get(2))
                        .debtor(debtors.get(2))
                        .build(),
                Debt.builder()
                        .description("Nota fiscal vencida")
                        .amount(new BigDecimal("2450.90"))
                        .dueDate(LocalDate.of(2026, 3, 20))
                        .status("VENCIDO")
                        .client(clients.get(0))
                        .debtor(debtors.get(1))
                        .build(),
                Debt.builder()
                        .description("Parcela de contrato comercial")
                        .amount(new BigDecimal("5100.00"))
                        .dueDate(LocalDate.of(2026, 7, 5))
                        .status("PENDENTE")
                        .client(clients.get(1))
                        .debtor(debtors.get(0))
                        .build()
        ));
    }

    private void seedProposals() {
        List<Debt> debts = debtRepository.findAll();
        if (debts.size() < 3) {
            return;
        }

        proposalsRepository.saveAll(List.of(
                Proposals.builder()
                        .debt(debts.get(0))
                        .offeredAmount(new BigDecimal("9800.00"))
                        .installments(4)
                        .status("EM_ANALISE")
                        .createdAt(LocalDate.of(2026, 5, 18))
                        .build(),
                Proposals.builder()
                        .debt(debts.get(1))
                        .offeredAmount(new BigDecimal("3300.00"))
                        .installments(2)
                        .status("ACEITA")
                        .createdAt(LocalDate.of(2026, 5, 20))
                        .build(),
                Proposals.builder()
                        .debt(debts.get(2))
                        .offeredAmount(new BigDecimal("7000.00"))
                        .installments(5)
                        .status("RECUSADA")
                        .createdAt(LocalDate.of(2026, 5, 22))
                        .build()
        ));
    }
}
