package JourneySync.demo.controller;

import JourneySync.demo.dto.request.CreateParticipantRequest;
import JourneySync.demo.entity.Participant;
import JourneySync.demo.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/trips/{tripId}/participants")
@RequiredArgsConstructor
public class ParticipantController {


    private final ParticipantService participantService;


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Participant addParticipant(
            @PathVariable UUID tripId,
            @RequestBody CreateParticipantRequest request
    ){

        return participantService.addParticipant(
                tripId,
                request
        );
    }
}
