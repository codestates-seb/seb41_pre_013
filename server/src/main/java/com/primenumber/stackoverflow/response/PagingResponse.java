package com.primenumber.stackoverflow.response;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PagingResponse<T> {
    private List<T> response;
    private PageInfo pageInfo;

    public PagingResponse(List<T> response, Page page) {
        this.response = response;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(),
                page.getTotalElements(), page.getTotalPages());
    }
}
