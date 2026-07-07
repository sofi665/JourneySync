package JourneySync.demo.repository;

import JourneySync.demo.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, UUID> {

    List<Participant> findByTripId(UUID tripId);

    Optional<Participant> findByIdAndTripId(UUID id, UUID tripId);

    boolean existsByTripIdAndUserId(UUID tripId, UUID userId);
}
