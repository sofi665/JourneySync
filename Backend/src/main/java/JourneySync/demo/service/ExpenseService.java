package JourneySync.demo.service;

import JourneySync.demo.dto.request.CreateExpenseRequest;
import JourneySync.demo.entity.*;
import JourneySync.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final TripRepository tripRepository;
    private final ParticipantRepository participantRepository;
    private final ExpenseRepository expenseRepository;
    private final ExpensePayerRepository expensePayerRepository;
    private final ExpenseShareRepository expenseShareRepository;

    public void createExpense(UUID tripId,
                              CreateExpenseRequest request) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow();

        Participant payer = participantRepository
                .findById(request.payerParticipantId())
                .orElseThrow();

        Expense expense = new Expense();

        expense.setTitle(request.title());
        expense.setAmount(request.amount());
        expense.setCurrency(request.currency());
        expense.setDate(LocalDate.now());
        expense.setTrip(trip);
        expense.setCreatedBy(payer);

        expenseRepository.save(expense);

        ExpensePayer expensePayer = new ExpensePayer();

        expensePayer.setExpense(expense);
        expensePayer.setParticipant(payer);
        expensePayer.setAmount(request.amount());

        expensePayerRepository.save(expensePayer);

        double splitAmount =
                request.amount() / request.participantIds().size();

        for (UUID participantId : request.participantIds()) {

            Participant participant =
                    participantRepository.findById(participantId)
                            .orElseThrow();

            ExpenseShare share = new ExpenseShare();

            share.setExpense(expense);
            share.setParticipant(participant);
            share.setAmount(splitAmount);

            expenseShareRepository.save(share);
        }
    }
}
