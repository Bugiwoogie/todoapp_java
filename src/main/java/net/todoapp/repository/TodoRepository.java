package net.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.todoapp.model.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
}