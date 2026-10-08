import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export interface RsvpInput {
  invitations: number;
  responseRate: number;
  declineRate: number;
  partySize: number;
}

export function computeRsvp(input: RsvpInput) {
  const invitations = Math.max(0, input.invitations);
  const responseRate = Math.min(100, Math.max(0, input.responseRate));
  const declineRate = Math.min(100, Math.max(0, input.declineRate));
  const partySize = Math.max(0, input.partySize);

  const responses = (invitations * responseRate) / 100;
  const declined = (responses * declineRate) / 100;
  const accepted = responses - declined;
  const attending = accepted * partySize;

  return { responses, declined, accepted, attending };
}

export function RsvpCalculator() {
  const [invitations, setInvitations] = useState('100');
  const [responseRate, setResponseRate] = useState('80');
  const [declineRate, setDeclineRate] = useState('20');
  const [partySize, setPartySize] = useState('1.6');

  const result = computeRsvp({
    invitations: Number(invitations) || 0,
    responseRate: Number(responseRate) || 0,
    declineRate: Number(declineRate) || 0,
    partySize: Number(partySize) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Invitations sent" value={invitations} onChange={setInvitations} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Response rate (%)" value={responseRate} onChange={setResponseRate} min={0} max={100} />
              <NumberField label="Decline rate (%)" value={declineRate} onChange={setDeclineRate} min={0} max={100} />
            </div>
            <NumberField
              label="People per accepted invite"
              value={partySize}
              onChange={setPartySize}
              min={0}
              step="0.1"
              hint="Households often reply with 1.4–1.8 people on average"
            />
          </div>
          <Hint>
            Track responses as they arrive: early RSVP data is the best predictor of the final headcount for
            catering and seating.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Expected attendees"
            value={whole(Math.round(result.attending))}
            sub={`${formatMoney(result.accepted)} accepted invitations`}
          />
          <ResultRows>
            <ResultRow label="Responses received" value={whole(Math.round(result.responses))} />
            <ResultRow label="Accepted" value={whole(Math.round(result.accepted))} />
            <ResultRow label="Declined" value={whole(Math.round(result.declined))} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RsvpCalculator;
