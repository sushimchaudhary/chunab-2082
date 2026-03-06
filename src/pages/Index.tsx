import { useState, useMemo, useCallback } from "react";
import {
  Users,
  Flag,
  MapPin,
  TrendingUp,
  Search,
  SlidersHorizontal,
  ChevronUp,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { CandidateDetail } from "@/components/candidates/CandidateDetail";
import { PartyBarChart } from "@/components/charts/PartyBarChart";
import { QualificationPieChart } from "@/components/charts/QualificationPieChart";
import { GenderChart } from "@/components/charts/GenderChart";
import { ProvinceChart } from "@/components/charts/ProvinceChart";
import Countdown from "@/components/ui/Countdown";
import { allCandidates } from "@/data/mockCandidates";
import {
  useAggregatedStats,
  useFilteredCandidates,
  useFilterOptions,
} from "@/hooks/useElectionData";
import { Candidate, FilterState } from "@/types/election";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";
import VoteCounte from "../components/live-update/page";
import VoteCountI from "../components/live-update/page";

const Index = () => {
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

  const [showFilters, setShowFilters] = useState(false); // Filter toggle state
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);

  const filterOptions = useFilterOptions(allCandidates, filters);

  const filteredCandidates = useFilteredCandidates(allCandidates, filters);

  const finalCandidates = useMemo(() => {
    if (!searchQuery.trim()) return filteredCandidates;
    const query = searchQuery.toLowerCase();
    return filteredCandidates.filter(
      (c) =>
        c.CandidateName.toLowerCase().includes(query) ||
        c.DistrictName.toLowerCase().includes(query),
    );
  }, [filteredCandidates, searchQuery]);

  const stats = useAggregatedStats(finalCandidates);

  const electionDate = useMemo(() => new Date("2026-03-05T07:00:00"), []);

  const previewCandidates = useMemo(() => {
    return finalCandidates.slice(0, 6);
  }, [finalCandidates]);

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDetailOpen(true);
  };
  return (
    <Layout>
      {/* <div className="mb-12 animate-fade-in flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <Countdown
            targetDate={electionDate}
            title="प्रतिनिधि सभा सदस्य निर्वाचन २०८२"
            subtitle="निर्वाचन काउन्टडाउन"
            className="shadow-2xl shadow-cyan-500/5"
          />
        </div>
      </div> */}
      <div className="pb-10">
        <VoteCountI />
      </div>

      {/* Stats Overview - Updated Colors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-slide-in-bottom">
        <StatCard
          title="Total Candidates"
          titleNp="कुल उम्मेदवार"
          value={stats.totalCandidates}
          icon={Users}
          className="bg-slate-900/60 border-cyan-500/20 text-cyan-400"
        />
        <StatCard
          title="Political Parties"
          titleNp="राजनीतिक दलहरू"
          value={Object.keys(stats.byParty).length}
          icon={Flag}
          className="bg-slate-900/60 border-cyan-500/20 text-cyan-400"
        />
        <StatCard
          title="Districts"
          titleNp="जिल्लाहरू"
          value={Object.keys(stats.byDistrict).length}
          icon={MapPin}
          className="bg-slate-900/60 border-cyan-500/20 text-cyan-400"
        />
        <StatCard
          title="Provinces"
          titleNp="प्रदेशहरू"
          value={Object.keys(stats.byProvince).length}
          icon={TrendingUp}
          className="bg-slate-900/60 border-cyan-500/20 text-cyan-400"
        />
      </div>

      <div id="main-content" className="mb-10 w-full scroll-mt-24">
        <div className="relative mb-4 flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 group-focus-within:text-cyan-400 transition-colors z-10" />

            <Input
              type="text"
              placeholder="नाम, जिल्ला, वा पार्टी खोज्नुहोस्..."
              value={searchQuery}
              onFocus={() => setShowFilters(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
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
          <div className="animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
            <div className="mt-2">
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                options={filterOptions}
              />
            </div>
          </div>
        )}
      </div>
      {/* 
      Candidate Preview */}
      <div
        className="animate-slide-in-bottom"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              उम्मेदवारहरू
            </h2>
            <p className="text-cyan-500/70 mt-1 font-medium">
              {filteredCandidates.length.toLocaleString()} उम्मेदवारहरू
              निर्वाचनका लागि तयार
            </p>
          </div>
          <Link to="/candidates">
            <Button
              variant="outline"
              className="border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-slate-950 transition-all font-semibold px-5"
            >
              सबै हेर्नुहोस् →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.CandidateID}
              candidate={candidate}
              onClick={() => handleCandidateClick(candidate)}
            />
          ))}
        </div>

        {filteredCandidates.length > 6 && (
          <div className="mt-12 pb-6 text-center">
            <Link to="/candidates">
              <Button
                size="lg"
                className="bg-cyan-500 text-white hover:bg-cyan-600 font-bold px-5 py-2 text-md rounded-md shadow-xl shadow-cyan-500/20 transition-transform active:scale-95"
              >
                सबै उम्मेदवार हेर्नुहोस्
              </Button>
            </Link>
          </div>
        )}
      </div>

      <CandidateDetail
        candidate={selectedCandidate}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <VoteCounte />

      {/* Charts Grid - Dark Containers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div
          className="bg-slate-950  rounded-2xl border border-cyan-900/20 animate-slide-in-bottom shadow-lg"
          style={{ animationDelay: "0.1s" }}
        >
          <PartyBarChart data={stats.byParty} />
        </div>
        <div
          className="bg-slate-950  rounded-2xl border border-cyan-900/20 animate-slide-in-bottom shadow-lg"
          style={{ animationDelay: "0.15s" }}
        >
          <QualificationPieChart data={stats.byQualification} />
        </div>
        <div
          className="bg-slate-950  rounded-2xl border border-cyan-900/20 animate-slide-in-bottom shadow-lg"
          style={{ animationDelay: "0.2s" }}
        >
          <GenderChart data={stats.byGender} />
        </div>
        <div
          className="bg-slate-950  rounded-2xl border border-cyan-900/20 animate-slide-in-bottom shadow-lg"
          style={{ animationDelay: "0.25s" }}
        >
          <ProvinceChart data={stats.byProvince} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
