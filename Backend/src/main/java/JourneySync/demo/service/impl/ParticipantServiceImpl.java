package JourneySync.demo.service.impl;

import JourneySync.demo.dto.ParticipantResponse;
import JourneySync.demo.dto.request.CreateParticipantRequest;
import JourneySync.demo.dto.request.UpdateParticipantRequest;
import JourneySync.demo.entity.Participant;
import JourneySync.demo.entity.Trip;
import JourneySync.demo.entity.User;
import JourneySync.demo.mapper.ParticipantMapper;
import JourneySync.demo.repository.ParticipantRepository;
import JourneySync.demo.repository.TripRepository;
import JourneySync.demo.repository.UserRepository;
import JourneySync.demo.service.ParticipantService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ParticipantServiceImpl implements ParticipantService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;
    private final ParticipantMapper participantMapper;

    @Transactional
    @Override
    public ParticipantResponse addParticipant(
            UUID tripId,
            CreateParticipantRequest request
    ) {
        Trip trip = findTripOrThrow(tripId);

        User user = userRepository.findById(request.userId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"
                        )
                );

        if (participantRepository.existsByTripIdAndUserId(tripId, request.userId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "User already is a participant in this trip"
            );
        }

        Participant participant = Participant.builder()
                .trip(trip)
                .user(user)
                .role(request.role())
                .build();

        trip.getParticipants().add(participant);

        return participantMapper.toResponse(
                participantRepository.save(participant)
        );
    }

    @Override
    public List<ParticipantResponse> getParticipantsByTripId(UUID tripId) {
        findTripOrThrow(tripId);

        return participantRepository.findByTripId(tripId)
                .stream()
                .map(participantMapper::toResponse)
                .toList();
    }

    @Override
    public ParticipantResponse getParticipantById(UUID tripId, UUID participantId) {
        findTripOrThrow(tripId);

        Participant participant = findParticipantOrThrow(tripId, participantId);

        return participantMapper.toResponse(participant);
    }

    @Transactional
    @Override
    public ParticipantResponse updateParticipant(
            UUID tripId,
            UUID participantId,
            UpdateParticipantRequest request
    ) {
        findTripOrThrow(tripId);

        Participant participant = findParticipantOrThrow(tripId, participantId);

        participant.setRole(request.role());

        return participantMapper.toResponse(participant);
    }

    @Transactional
    @Override
    public void deleteParticipant(UUID tripId, UUID participantId) {
        Trip trip = findTripOrThrow(tripId);

        Participant participant = findParticipantOrThrow(tripId, participantId);

        trip.getParticipants().remove(participant);
        participantRepository.delete(participant);
    }

    private Trip findTripOrThrow(UUID tripId) {
        return tripRepository.findById(tripId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Trip not found"
                        )
                );
    }

    private Participant findParticipantOrThrow(UUID tripId, UUID participantId) {
        return participantRepository.findByIdAndTripId(participantId, tripId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Participant not found"
                        )
                );
    }
}
