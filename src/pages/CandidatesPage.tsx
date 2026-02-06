import { useState, useMemo, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { CandidateDetail } from "@/components/candidates/CandidateDetail";
import { allCandidates } from "@/data/mockCandidates";
import {
  useFilteredCandidates,
  useFilterOptions,
} from "@/hooks/useElectionData";
import { Candidate, FilterState } from "@/types/election";
import { Input } from "@/components/ui/input";
import { Search, Users, SlidersHorizontal, ChevronUp } from "lucide-react"; // नयाँ आइकनहरू
import { Button } from "@/components/ui/button";
import { DISTRICT_MAP_EN_NP, PARTY_MAP_EN_NP } from "@/data/mappings";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 24;

const CandidatesPage = () => {
  const [filters, setFilters] = useState<FilterState>({
    province: null,
    district: null,
    party: null,
    qualification: null,
    constituency: null,
    gender: null,
    ageMin: null,
    ageMax: null,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);

  // Filter Panel देखाउन वा लुकाउनका लागि स्टेट
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = useFilterOptions(allCandidates, filters);
  const filteredByFilters = useFilteredCandidates(allCandidates, filters);

  // Apply search filter (तपाईँको पुरानै लजिक)
  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) return filteredByFilters;
    const query = searchQuery.toLowerCase();
    const searchTerms = [query];

    Object.keys(DISTRICT_MAP_EN_NP).forEach((enKey) => {
      if (enKey.includes(query)) searchTerms.push(DISTRICT_MAP_EN_NP[enKey]);
    });

    Object.keys(PARTY_MAP_EN_NP).forEach((enKey) => {
      if (enKey.includes(query)) searchTerms.push(PARTY_MAP_EN_NP[enKey]);
    });

    return filteredByFilters.filter((c) =>
      searchTerms.some(
        (term) =>
          c.CandidateName.toLowerCase().includes(term) ||
          c.DistrictName.toLowerCase().includes(term) ||
          c.PoliticalPartyName.toLowerCase().includes(term),
      ),
    );
  }, [filteredByFilters, searchQuery]);

  const paginatedCandidates = useMemo(() => {
    const end = page * ITEMS_PER_PAGE;
    return filteredCandidates.slice(0, end);
  }, [filteredCandidates, page]);

  const hasMore = paginatedCandidates.length < filteredCandidates.length;

  const handleCandidateClick = useCallback((candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDetailOpen(true);
  }, []);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-50 font-nepali tracking-tight">
          उम्मेदवार खोज्नुहोस्
        </h1>
        <p className="mt-1 text-cyan-600/80 text-sm">
          Search and explore all candidates across Nepal
        </p>
      </div>
      {/* Search Bar with Filter Toggle */}
      <div className="relative mb-4 flex items-center gap-3">
        <div className="relative flex-1 group">
          {/* Search Icon with Focus Color Change */}
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 group-focus-within:text-cyan-400 transition-colors z-10" />

          <Input
            type="text"
            placeholder="नाम, जिल्ला, वा पार्टी खोज्नुहोस्..."
            value={searchQuery}
            onFocus={() => setShowFilters(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className={cn(
              "pl-10 py-3 text-base bg-cyan-950/20 border-cyan-900/50 text-cyan-50 rounded-md transition-all duration-300",
             
              
              "focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-0 focus-visible:border-cyan-500",
              "shadow-[0_0_20px_-5px_rgba(6,182,212,0.1)] focus-visible:shadow-[0_0_20px_-3px_rgba(6,182,212,0.3)]",
            )}
          />
        </div>

       
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "h-10 w-10 p-0 rounded-md border-cyan-900/50 transition-all duration-200 shrink-0",
            showFilters
              ? "bg-cyan-500 text-[#011c22] border-cyan-500 hover:bg-cyan-500 hover:text-[#011c22]" // Hover state fixed
              : "bg-cyan-950/20 text-cyan-400 hover:bg-cyan-900/40 hover:text-cyan-300 hover:border-cyan-700",
          )}
        >
          {showFilters ? (
            <ChevronUp className="h-5 w-5 stroke-[2.5px]" />
          ) : (
            <SlidersHorizontal className="h-5 w-5 stroke-[2px]" />
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="mb-6 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            options={filterOptions}
          />
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-cyan-600" />
          <span className="text-sm font-medium text-cyan-600">
            {filteredCandidates.length.toLocaleString()} उम्मेदवार फेला पर्यो
          </span>
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-cyan-500 hover:underline"
          >
            क्लियर सर्च
          </button>
        )}
      </div>

      {/* Candidates Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="text-center py-20 bg-cyan-950/10 rounded-2xl border border-dashed border-cyan-900/50">
          <Users className="h-12 w-12 mx-auto text-cyan-900 mb-4" />
          <h3 className="text-lg font-medium text-cyan-100 mb-2 font-nepali">
            कुनै उम्मेदवार फेला परेन
          </h3>
          <p className="text-sm text-cyan-700">
            कृपया फिल्टर वा सर्च शब्द परिवर्तन गर्नुहोस्
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.CandidateID}
                candidate={candidate}
                onClick={() => handleCandidateClick(candidate)}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="mt-12 text-center">
              <Button
                onClick={loadMore}
                size="lg"
                className="bg-cyan-900/20 hover:bg-cyan-800/40 text-cyan-400 border border-cyan-800 rounded-xl px-8"
              >
                थप लोड गर्नुहोस्
              </Button>
            </div>
          )}
        </>
      )}

      {/* Candidate Detail Modal */}
      <CandidateDetail
        candidate={selectedCandidate}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </Layout>
  );
};

export default CandidatesPage;
