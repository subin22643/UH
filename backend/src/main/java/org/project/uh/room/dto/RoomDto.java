package org.project.uh.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RoomDto {
	private String sessionId;
	private String roomName;
	private String roomPassword;
	private int gameCategory;
	private int quizCategory;
	private int count = 1;
	private int max;
	private boolean isPlay;
}
