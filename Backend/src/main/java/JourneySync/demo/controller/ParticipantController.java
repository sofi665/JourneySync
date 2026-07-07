package JourneySync.demo.controller;

import JourneySync.demo.dto.ParticipantResponse;
import JourneySync.demo.dto.request.CreateParticipantRequest;
import JourneySync.demo.dto.request.UpdateParticipantRequest;
import JourneySync.demo.service.ParticipantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/trips/{tripId}/participants")
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantService participantService;

    @PostMapping
    public ResponseEntity<ParticipantResponse> addParticipant(
            @PathVariable UUID tripId,
            @Valid @RequestBody CreateParticipantRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(participantService.addParticipant(tripId, request));
    }

    @GetMapping
    public ResponseEntity<List<ParticipantResponse>> getParticipants(
            @PathVariable UUID tripId
    ) {
        return ResponseEntity.ok(
                participantService.getParticipantsByTripId(tripId)
        );
    }

    @GetMapping("/{participantId}")
    public ResponseEntity<ParticipantResponse> getParticipantById(
            @PathVariable UUID tripId,
            @PathVariable UUID participantId
    ) {
        return ResponseEntity.ok(
                participantService.getParticipantById(tripId, participantId)
        );
    }

    @PutMapping("/{participantId}")
    public ResponseEntity<ParticipantResponse> updateParticipant(
            @PathVariable UUID tripId,
            @PathVariable UUID participantId,
            @Valid @RequestBody UpdateParticipantRequest request
    ) {
        return ResponseEntity.ok(
                participantService.updateParticipant(tripId, participantId, request)
        );
    }

    @DeleteMapping("/{participantId}")
    public ResponseEntity<Void> deleteParticipant(
            @PathVariable UUID tripId,
            @PathVariable UUID participantId
    ) {
        participantService.deleteParticipant(tripId, participantId);

        return ResponseEntity.noContent().build();
    }
}
