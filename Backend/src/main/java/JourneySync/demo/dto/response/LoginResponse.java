package JourneySync.demo.dto.response;

public record LoginResponse(
        String token,
        UserResponse user
) {
}
