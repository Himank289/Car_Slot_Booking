package vw.him.car.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vw.him.car.entity.BookACar;

import java.util.List;

@Repository
public interface BookACarRepository extends JpaRepository<BookACar,Long> {

//    @Query("SELECT b FROM BookACar b WHERE b.user.id = :userId")
    List<BookACar> findAllByUserId(Long id);
}
