package JourneySync.demo.service;

import JourneySync.demo.dto.request.CreateParticipantRequest;
import JourneySync.demo.entity.Participant;
import JourneySync.demo.entity.Role;
import jakarta.transaction.Transactional;

import java.util.UUID;

public interface ParticipantService {



    @Transactional
    Participant addParticipant(
            UUID tripId,
            CreateParticipantRequest request
    );
}
