package JourneySync.demo.controller;

import JourneySync.demo.dto.CreateTripRequest;
import JourneySync.demo.dto.DebtSettlementDTO;
import JourneySync.demo.dto.ParticipantBalanceDTO;
import JourneySync.demo.dto.TripResponse;
import JourneySync.demo.dto.request.CreateParticipantRequest;
import JourneySync.demo.service.BalanceService;
import JourneySync.demo.service.ParticipantService;
import JourneySync.demo.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/trips")
@RequiredArgsConstructor
public class TripController {

    private final BalanceService balanceService;
    private final TripService tripService;
    private final ParticipantService participantService;


    @GetMapping("/{tripId}/balance")
    public List<ParticipantBalanceDTO> getBalances(@PathVariable UUID tripId) {
        return balanceService.calculateBalances(tripId);
    }
    @GetMapping("/{tripId}/settlements")
    public List<DebtSettlementDTO> getSettlements(@PathVariable UUID tripId) {
        return balanceService.simplifyDebts(tripId);
    }
    @PostMapping
    public ResponseEntity<TripResponse> createTrip(
            @RequestBody CreateTripRequest request
    ) {
        return ResponseEntity.ok(
                tripService.createTrip(request)
        );
    }
    @GetMapping
    public ResponseEntity<List<TripResponse>> getAllTrips(){

        return ResponseEntity.ok(
                tripService.getAllTrips()
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<TripResponse> getTripById(
            @PathVariable UUID id
    ){

        return ResponseEntity.ok(
                tripService.getTripById(id)
        );
    }

}
