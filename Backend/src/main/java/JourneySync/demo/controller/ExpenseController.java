package JourneySync.demo.controller;

import JourneySync.demo.dto.CreateExpenseRequest;
import JourneySync.demo.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/trips/{tripId}/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<Void> createExpense(
            @PathVariable UUID tripId,
            @RequestBody CreateExpenseRequest request
    ) {

        expenseService.createExpense(tripId, request);

        return ResponseEntity.ok().build();
    }
}
