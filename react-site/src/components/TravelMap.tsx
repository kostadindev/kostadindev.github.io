import { useMemo, useState } from 'react';
import { Box, Container, Typography, Chip, Stack } from '@mui/material';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { travelCountries } from '../data/content';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const regions = [
  { key: 'europe' as const, label: 'Europe', count: travelCountries.europe.length },
  { key: 'northAmerica' as const, label: 'N. America', count: travelCountries.northAmerica.length },
  { key: 'caribbean' as const, label: 'Caribbean', count: travelCountries.caribbean.length },
  { key: 'middleEast' as const, label: 'Middle East', count: travelCountries.middleEast.length },
  { key: 'southAmerica' as const, label: 'S. America', count: travelCountries.southAmerica.length },
];

const PINS: { name: string; coordinates: [number, number] }[] = [
  { name: 'Sofia', coordinates: [23.3219, 42.6977] },
  { name: 'New York', coordinates: [-74.006, 40.7128] },
  { name: 'Cambridge', coordinates: [0.1218, 52.2053] },
];

const NATIVE_ID = '100'; // Bulgaria
const LIVED_IDS = new Set(['840', '826']); // USA, UK

const allIds = new Set(
  Object.values(travelCountries).flatMap((list) => list.map((c) => c.id))
);

const totalCountries = allIds.size;

function getFill(id: string) {
  if (id === NATIVE_ID) return '#d4851f'; // dark amber for native
  if (LIVED_IDS.has(id)) return '#e89a3c'; // brand orange for lived in
  if (allIds.has(id)) return '#f4c76b'; // soft gold for visited
  return '#eaeaec';
}

function getHoverFill(id: string) {
  if (id === NATIVE_ID) return '#b8720f';
  if (LIVED_IDS.has(id)) return '#d4851f';
  if (allIds.has(id)) return '#e89a3c';
  return '#d6d6da';
}

export default function TravelMap() {
  const [tooltip, setTooltip] = useState('');

  const visitedMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const list of Object.values(travelCountries)) {
      for (const c of list) {
        map.set(c.id, c.name);
      }
    }
    return map;
  }, []);

  return (
    <Box id="travel" sx={{ py: 12, bgcolor: '#fafaf8' }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 2 }}>
          Travel Map
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ color: 'grey.600', mb: 4, maxWidth: 520, mx: 'auto' }}
        >
          {totalCountries} countries across four continents.
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 4 }}
        >
          {regions.map((r) => (
            <Chip
              key={r.key}
              label={`${r.label} (${r.count})`}
              size="small"
              sx={{
                bgcolor: 'rgba(232, 154, 60, 0.10)',
                color: '#b37326',
                fontWeight: 500,
              }}
            />
          ))}
        </Stack>

        <Box
          sx={{
            position: 'relative',
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <ComposableMap
            projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
            style={{ width: '100%', height: 'auto' }}
          >
            <ZoomableGroup>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const id = geo.id;
                    const isVisited = allIds.has(id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          if (isVisited) setTooltip(visitedMap.get(id) ?? id);
                        }}
                        onMouseLeave={() => setTooltip('')}
                        style={{
                          default: {
                            fill: getFill(id),
                            stroke: '#fff',
                            strokeWidth: 0.5,
                            outline: 'none',
                          },
                          hover: {
                            fill: getHoverFill(id),
                            stroke: '#fff',
                            strokeWidth: 0.5,
                            outline: 'none',
                            cursor: isVisited ? 'pointer' : 'default',
                          },
                          pressed: { outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              {PINS.map((pin) => (
                <Marker
                  key={pin.name}
                  coordinates={pin.coordinates}
                  onMouseEnter={() => setTooltip(pin.name)}
                  onMouseLeave={() => setTooltip('')}
                >
                  <circle r={3} fill="#fff" stroke="#b8720f" strokeWidth={1.5} />
                  <text
                    textAnchor="middle"
                    y={-8}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 7,
                      fontWeight: 600,
                      fill: '#444',
                    }}
                  >
                    {pin.name}
                  </text>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {tooltip && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(0,0,0,0.75)',
                color: '#fff',
                px: 2,
                py: 0.75,
                borderRadius: 2,
                fontSize: 14,
                fontWeight: 500,
                pointerEvents: 'none',
              }}
            >
              {tooltip}
            </Box>
          )}
        </Box>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          sx={{ mt: 3, mb: 2 }}
        >
          {[
            { color: '#d4851f', label: 'Native' },
            { color: '#e89a3c', label: 'Lived' },
            { color: '#f4c76b', label: 'Visited' },
          ].map((item) => (
            <Stack key={item.label} direction="row" alignItems="center" spacing={0.75}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color }} />
              <Typography variant="caption" sx={{ color: 'grey.600' }}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1.5}
          flexWrap="wrap"
          useFlexGap
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          {Object.values(travelCountries)
            .flat()
            .map((c) => (
              <Chip
                key={c.id}
                label={c.name}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(232, 154, 60, 0.3)',
                  color: 'grey.700',
                  fontSize: 12,
                }}
              />
            ))}
        </Stack>
      </Container>
    </Box>
  );
}
