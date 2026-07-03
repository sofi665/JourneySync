package JourneySync.demo.service;

import JourneySync.demo.dto.DebtSettlementDTO;
import JourneySync.demo.dto.ParticipantBalanceDTO;
import JourneySync.demo.entity.ExpensePayer;
import JourneySync.demo.entity.ExpenseShare;
import JourneySync.demo.entity.Participant;
import JourneySync.demo.repository.ExpensePayerRepository;
import JourneySync.demo.repository.ExpenseShareRepository;
import JourneySync.demo.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BalanceService {

    private final ParticipantRepository participantRepo;
    private final ExpensePayerRepository payerRepo;
    private final ExpenseShareRepository shareRepo;

    public List<ParticipantBalanceDTO> calculateBalances(UUID tripId) {

        List<Participant> participants =
                participantRepo.findByTripId(tripId);

        return participants.stream().map(p -> {

            Double totalPaid = payerRepo
                    .findByParticipantId(p.getId())
                    .stream()
                    .mapToDouble(ExpensePayer::getAmount)
                    .sum();

            Double totalOwed = shareRepo
                    .findByParticipantId(p.getId())
                    .stream()
                    .mapToDouble(ExpenseShare::getAmount)
                    .sum();

            return new ParticipantBalanceDTO(
                    p.getId(),
                    p.getUser().getName(),
                    totalPaid,
                    totalOwed
            );

        }).toList();
    }
    public List<DebtSettlementDTO> simplifyDebts(UUID tripId) {

        List<ParticipantBalanceDTO> balances = calculateBalances(tripId);

        List<ParticipantBalanceDTO> creditors = balances.stream()
                .filter(b -> b.getBalance() > 0)
                .toList();

        List<ParticipantBalanceDTO> debtors = balances.stream()
                .filter(b -> b.getBalance() < 0)
                .toList();

        List<DebtSettlementDTO> settlements = new ArrayList<>();

        int i = 0;
        int j = 0;

        while (i < debtors.size() && j < creditors.size()) {

            ParticipantBalanceDTO debtor = debtors.get(i);
            ParticipantBalanceDTO creditor = creditors.get(j);

            double debtAmount = Math.abs(debtor.getBalance());
            double creditAmount = creditor.getBalance();

            double settledAmount = Math.min(debtAmount, creditAmount);

            settlements.add(
                    new DebtSettlementDTO(
                            debtor.getName(),
                            creditor.getName(),
                            settledAmount
                    )
            );

            debtor.setBalance(debtor.getBalance() + settledAmount);
            creditor.setBalance(creditor.getBalance() - settledAmount);

            if (Math.abs(debtor.getBalance()) < 0.01) {
                i++;
            }

            if (Math.abs(creditor.getBalance()) < 0.01) {
                j++;
            }
        }

        return settlements;
    }
}
