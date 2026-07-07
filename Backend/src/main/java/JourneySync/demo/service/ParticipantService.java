package JourneySync.demo.service;

import JourneySync.demo.dto.ParticipantResponse;
import JourneySync.demo.dto.request.CreateParticipantRequest;
import JourneySync.demo.dto.request.UpdateParticipantRequest;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

public interface ParticipantService {

    @Transactional
    ParticipantResponse addParticipant(UUID tripId, CreateParticipantRequest request);

    List<ParticipantResponse> getParticipantsByTripId(UUID tripId);

    ParticipantResponse getParticipantById(UUID tripId, UUID participantId);

    @Transactional
    ParticipantResponse updateParticipant(
            UUID tripId,
            UUID participantId,
            UpdateParticipantRequest request
    );

    @Transactional
    void deleteParticipant(UUID tripId, UUID participantId);
}
