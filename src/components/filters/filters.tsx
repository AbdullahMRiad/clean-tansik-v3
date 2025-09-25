type Props = {
    query: string
    onQueryChange: (value: string) => void
}

function FiltersSection({ query, onQueryChange }: Props) {
    return(
        <div id="filters-section" className="panel flex items-center gap-2">
            <input
                type="text"
                placeholder="ابحث بالاسم أو المجال"
                className="w-full px-3 py-2 rounded-xl bg-white"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
            />
        </div>
    )
}

export default FiltersSection