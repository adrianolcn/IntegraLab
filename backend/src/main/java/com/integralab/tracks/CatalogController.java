package com.integralab.tracks;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CatalogController {

    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/tracks")
    public ResponseEntity<List<Track>> getAllTracks(@RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        List<Track> tracks = catalogService.getAllTracks();
        tracks.forEach(t -> t.setLocale(language));
        return ResponseEntity.ok(tracks);
    }

    @GetMapping("/tracks/{id}")
    public ResponseEntity<Track> getTrackById(@PathVariable UUID id, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        try {
            Track t = catalogService.getTrackById(id);
            t.setLocale(language);
            return ResponseEntity.ok(t);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/tracks/slug/{slug}")
    public ResponseEntity<Track> getTrackBySlug(@PathVariable String slug, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
         try {
            Track t = catalogService.getTrackBySlug(slug);
            t.setLocale(language);
            return ResponseEntity.ok(t);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/tracks/{trackId}/modules")
    public ResponseEntity<List<LearningModule>> getModulesByTrackId(@PathVariable UUID trackId, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        List<LearningModule> modules = catalogService.getModulesByTrackId(trackId);
        modules.forEach(m -> m.setLocale(language));
        return ResponseEntity.ok(modules);
    }

    @GetMapping("/modules/{id}")
    public ResponseEntity<LearningModule> getModuleById(@PathVariable UUID id, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
         try {
            LearningModule m = catalogService.getModuleById(id);
            m.setLocale(language);
            return ResponseEntity.ok(m);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/modules/{moduleId}/missions")
    public ResponseEntity<List<Mission>> getMissionsByModuleId(@PathVariable UUID moduleId, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
        List<Mission> missions = catalogService.getMissionsByModuleId(moduleId);
        missions.forEach(m -> m.setLocale(language));
        return ResponseEntity.ok(missions);
    }

    @GetMapping("/missions/{id}")
    public ResponseEntity<Mission> getMissionById(@PathVariable UUID id, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
         try {
            Mission m = catalogService.getMissionById(id);
            m.setLocale(language);
            return ResponseEntity.ok(m);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/missions/slug/{slug}")
    public ResponseEntity<Mission> getMissionBySlug(@PathVariable String slug, @RequestHeader(value = "Accept-Language", defaultValue = "pt-BR") String language) {
         try {
            Mission m = catalogService.getMissionBySlug(slug);
            m.setLocale(language);
            return ResponseEntity.ok(m);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
