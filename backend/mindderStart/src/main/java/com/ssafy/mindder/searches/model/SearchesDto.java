package com.ssafy.mindder.searches.model;

import java.util.List;

import com.ssafy.mindder.users.model.UsersDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchesDto {

	List<UsersDto> users;
	List<String> nomal;
}
