<script lang="ts">
    import Arrow from "$lib/images/arrows/arrow_right.svg?raw";
    export let currentPage: number;
    export let totalCount: number;
    export let pageSize: number;

    // set the number of siblings
    let siblingCount: number;
    $: siblingCount = 1;

    // set the dots to be used between first and last pages and range if pages between first and last pages and range
    const DOTS = '...';

    // set the pagination range to empty array
    let paginationRange: any[] = [];

    // function to return ann array for range using the start and end
    const range = (start: number, end: number) => {

        let length = (end - start) + 1;

        return Array.from({ length }, (_, idx) => idx + start);

    };

    // set the total page count
    let totalPageCount: number;
    $: totalPageCount = Math.ceil(totalCount / pageSize);

    // pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    let totalPageNumbers: number;
    $: totalPageNumbers = siblingCount + 5;

    /*
        if the number of pages is less than the page numbers, show in 
        pagination and return the range [1..totalPageCount]
    */
    $: if (totalPageNumbers >= totalPageCount) {

        paginationRange = range(1, totalPageCount);

    };

    // set the index for left sibling
    let leftSiblingIndex: number;
    $: leftSiblingIndex = Math.max(currentPage - siblingCount, 1);

    // set the index for right sibling
    let rightSiblingIndex: number;
    $: rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount
    );

    /*
        do not show dots if there is only one position left 
        after/before the left/right page count as that would lead to a change in the pagination
        component size
    */
    let shouldShowLeftDots: boolean;

    // do not show left dots if left sibling index is less than 2 and total page count is less or equal to totalPageNumbers
    $: shouldShowLeftDots = leftSiblingIndex > 2 && totalPageCount >= totalPageNumbers;

    let shouldShowRightDots: boolean;

    // do not show right dots if right sibling index is greater than or equal to totalPageCount -2 and totalPageCount is greater than or equal to totalPageNumbers
    $: shouldShowRightDots = totalPageCount - 2 >= rightSiblingIndex  && totalPageCount >= totalPageNumbers;

    const firstPageIndex = 1;
    let lastPageIndex: number;
    $: lastPageIndex = totalPageCount;

    let lastPage: number;

    $: lastPage = paginationRange[paginationRange.length - 1];

    $: if (!shouldShowLeftDots && shouldShowRightDots) {

        let leftItemCount = (2 + 1) * siblingCount;

        let leftRange = range(1, leftItemCount);

        paginationRange = [...leftRange, DOTS, lastPageIndex];

    };

    $: if (shouldShowLeftDots && !shouldShowRightDots) {

        let rightItemCount = (2 + 1) * siblingCount;

        let rightRange = range(

            (totalPageCount - rightItemCount + 1),
            totalPageCount

        );
        paginationRange = [firstPageIndex, DOTS, ...rightRange];
    }

    $: if (shouldShowLeftDots && shouldShowRightDots) {

        let middleRange = range(leftSiblingIndex, rightSiblingIndex);

        paginationRange = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];

    };

    const onNext = () => {

        currentPage = currentPage + 1;

    };

    const onPrevious = () => {

        currentPage = currentPage - 1;

    };

</script>
{#if (paginationRange.length >= 2)}
    <ul
        class="pagination_container"
    >
        <!-- left navigation arrow -->
        <div
            role={"left arrow"}
            class={currentPage === 1 ? "pagination_item disabled" : "pagination_item"}
            on:click={onPrevious}
            on:keyup={onPrevious}
        >
            <li>
                <div class="arrow_left">
                    {@html Arrow}
                </div>
            </li>
        </div>
        {#each paginationRange as pageNumber, i}
            <!-- if the pageItem is a DOT, render the DOTS unicode character -->
            {#if (pageNumber === DOTS)}
                {#if (shouldShowLeftDots && i === 1)}
                    <div
                        role={"select previous"}
                        on:click={onPrevious}
                        on:keyup={onPrevious}
                    >
                        <li 
                            class="pagination_item"
                            
                        >
                            &#8230;
                        </li>
                    </div>
                {:else if (shouldShowRightDots)}
                    <div
                        role={"select next"}
                        on:click={onNext}
                        on:keyup={onNext}
                    >
                        <li 
                            class="pagination_item"
                            
                        >
                            &#8230;
                        </li>
                    </div>
                {/if}
            {:else}
                <div
                    role={"paginated number"}
                    class={pageNumber === currentPage ? "pagination_item selected" : "pagination_item"}
                    on:click={() => currentPage = pageNumber}
                    on:keyup={() => currentPage = pageNumber}
                >
                    <li>
                        {pageNumber}
                    </li>
                </div>
            {/if}
            <!-- render the page buttons -->
        {/each}
        <div 
            role={"next button"}
            class={currentPage === lastPage ? "pagination_item disabled" : "pagination_item"}
            on:click={onNext}
            on:keyup={onNext}
        >
            <li>
                <div class="arrow_right">
                    {@html Arrow}
                </div>
            </li>
        </div>
        
    </ul>
{/if}

<style>
    .pagination_container {
        display: flex;
        list-style-type: none;
        padding: 1rem 0;
    }

    .pagination_item {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        height: 3rem;
        width: 3rem;
        text-align: center;
        margin: 0.5rem;
        min-width: 1rem;
        font-size: 1.75rem;
        line-height: 2.75rem;
    }

    .pagination_item:hover {
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
        cursor: pointer;
        color: #28387C;
        fill: #28387C;
    }

    .pagination_item.selected {
        border: 2px solid #4C4239;
    }

    .arrow_right {
        display: flex;
        width: 0.75rem;
        height: auto;
    }

    .arrow_left {
        display: flex;
        width: 0.75rem;
        height: auto;
        transform: rotate(180deg);
    }

    .disabled {
        pointer-events: none;
        color: rgba(224,217,217,0.5);
    }

    .disabled > li > .arrow_right {
        fill: rgba(33,33,33,0.5);
    }

    .disabled > li > .arrow_left {
        fill: rgba(33,33,33,0.5);
    }

    .pagination_item.disabled:hover {
        background-color: transparent;
        cursor: default;
    }

    @media all and (max-width:720px){
        .pagination_item {
            height: 1.5rem;
            width: 1.5rem;
            text-align: center;
            margin: 0.25rem;
            min-width: 1rem;
            font-size: 1rem;
            line-height: 1rem;
        }

        .arrow_left {
            display: flex;
            width: 0.5rem;
            height: auto;
        }

        .arrow_right {
            display: flex;
            width: 0.5rem;
            height: auto;
        }

        .pagination_item.selected {
            border: 1px solid #4C4239;
        }
    }
</style>