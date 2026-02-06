import { X } from "lucide-react";
import { FilterState } from "@/types/election";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import { DISTRICT_MAP_EN_NP, PARTY_MAP_EN_NP, PROVINCE_MAP_EN_NP } from "@/data/mappings";

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  options: {
    provinces: string[];
    districts: string[];
    constituencies: number[];
    parties: string[];
    qualifications: string[];
    genders: string[];
  };
  className?: string;
}

export function FilterPanel({
  filters,
  onFilterChange,
  options,
  className,
}: FilterPanelProps) {
  
  const clearFilters = () => {
    onFilterChange({
      province: null,
      district: null,
      constituency: null,
      party: null,
      qualification: null,
      gender: null,
      ageMin: null,
      ageMax: null,
    });
  };

  const updateFilter = (key: keyof FilterState, value: string | number | null) => {
    onFilterChange({
      ...filters,
      [key]: value === "all" ? null : value,
    });
  };

  const getKeywords = (value: string, map: Record<string, string>) => {
    return Object.entries(map)
      .filter(([_, v]) => v === value)
      .map(([k]) => k);
  };

  const provinceOptions = options.provinces.map(p => ({ 
    label: p, 
    value: p,
    keywords: getKeywords(p, PROVINCE_MAP_EN_NP)
  }));
  
  const districtOptions = options.districts.map(d => ({ 
    label: d, 
    value: d,
    keywords: getKeywords(d, DISTRICT_MAP_EN_NP)
  }));
  
  const partyOptions = options.parties.map(p => ({ 
    label: p, 
    value: p,
    keywords: getKeywords(p, PARTY_MAP_EN_NP)
  }));

  // Dropdown Content र Item को लागि Shared Style
  const selectContentStyle = "bg-[#011c22] border-cyan-900/50 text-cyan-50 shadow-2xl rounded-xl";
  const selectItemStyle = "focus:bg-cyan-500 focus:text-[#011c22] cursor-pointer transition-colors rounded-lg m-1";

  return (
    <div className={cn("space-y-4 p-5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 backdrop-blur-md", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg text-cyan-50 tracking-tight">फिल्टर</h3>
          <span className="text-xs font-medium uppercase tracking-widest text-cyan-700">Filters</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-rose-500 hover:text-white hover:bg-rose-600 transition-all rounded-lg h-8 font-bold text-xs"
        >
          <X className="h-3.5 w-3.5 mr-1" />
          Clear all
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Province Filter */}
        <Combobox
          options={provinceOptions}
          value={filters.province}
          onSelect={(v) => updateFilter("province", v)}
          placeholder="प्रदेश (Province)"
        />

        {/* District Filter */}
        <Combobox
          options={districtOptions}
          value={filters.district}
          onSelect={(v) => updateFilter("district", v)}
          placeholder="जिल्ला (District)"
        />

        {/* Constituency Filter */}
        <Select
          value={filters.constituency?.toString() || "all"}
          onValueChange={(v) => updateFilter("constituency", v === "all" ? "all" : parseInt(v))}
        >
          <SelectTrigger className="h-11 bg-cyan-900/20 border-cyan-900/50 text-cyan-50 rounded-xl focus:ring-cyan-500/30">
            <SelectValue placeholder="क्षेत्र (Area)" />
          </SelectTrigger>
          <SelectContent className={selectContentStyle}>
            <SelectItem value="all" className={selectItemStyle}>सबै क्षेत्र</SelectItem>
            {options.constituencies.map((constituency) => (
              <SelectItem key={constituency} value={constituency.toString()} className={selectItemStyle}>
                Area {constituency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Party Filter */}
        <Combobox
          options={partyOptions}
          value={filters.party}
          onSelect={(v) => updateFilter("party", v)}
          placeholder="पार्टी (Party)"
        />

        {/* Qualification Filter */}
        <Select
          value={filters.qualification || "all"}
          onValueChange={(v) => updateFilter("qualification", v)}
        >
          <SelectTrigger className="h-11 bg-cyan-900/20 border-cyan-900/50 text-cyan-50 rounded-xl focus:ring-cyan-500/30">
            <SelectValue placeholder="योग्यता (Qualification)" />
          </SelectTrigger>
          <SelectContent className={selectContentStyle}>
            <SelectItem value="all" className={selectItemStyle}>सबै योग्यता</SelectItem>
            {options.qualifications.map((qual) => (
              <SelectItem key={qual} value={qual} className={selectItemStyle}>
                {qual}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Gender Filter */}
        <Select
          value={filters.gender || "all"}
          onValueChange={(v) => updateFilter("gender", v)}
        >
          <SelectTrigger className="h-11 bg-cyan-900/20 border-cyan-900/50 text-cyan-50 rounded-xl focus:ring-cyan-500/30">
            <SelectValue placeholder="लिङ्ग (Gender)" />
          </SelectTrigger>
          <SelectContent className={selectContentStyle}>
            <SelectItem value="all" className={selectItemStyle}>सबै लिङ्ग</SelectItem>
            {options.genders.map((gender) => (
              <SelectItem key={gender} value={gender} className={selectItemStyle}>
                {gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-2 p-2 rounded-xl bg-cyan-900/10 border border-cyan-900/30">
          <div className="flex items-center justify-between text-[11px] font-bold text-cyan-500 uppercase tracking-tighter">
            <span>उमेर: {filters.ageMin || 25} - {filters.ageMax || 70}</span>
          </div>
          <Slider
            min={25}
            max={70}
            step={5}
            value={[filters.ageMin || 25, filters.ageMax || 70]}
            onValueChange={([min, max]) => {
              onFilterChange({
                ...filters,
                ageMin: min === 25 ? null : min,
                ageMax: max === 70 ? null : max,
              });
            }}
            className={cn(
                "py-2",
                "[&_[role=slider]]:bg-cyan-500 [&_[role=slider]]:border-cyan-400 [&_[role=slider]]:focus:ring-cyan-500",
                "[&_.relative]:bg-cyan-950 [&_[data-orientation=horizontal]]:bg-cyan-500"
            )}
          />
        </div>
      </div>
    </div>
  );
}