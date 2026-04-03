'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

export default function AdminSettings() {
  const [settings, setSettings] = useState({ activationFee: 500, referralCommissionRates: { trainer: 50, teamLeader: 75, seniorTeamLeader: 100 }, paymentMethods: { bKash: '', Nagad: '', Rocket: '' } });
  useEffect(() => {
    fetch('/api/admin/settings').then(res => res.json()).then(setSettings);
  }, []);
  const updateSettings = async () => {
    const res = await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
    if (res.ok) showToast.success('Settings saved');
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">System Settings</h1>
      <Card className="space-y-4">
        <div><label>Activation Fee (BDT)</label><input type="number" className="border p-2 rounded w-full" value={settings.activationFee} onChange={e => setSettings({ ...settings, activationFee: parseInt(e.target.value) })} /></div>
        <div><label>Trainer Commission (BDT)</label><input type="number" className="border p-2 rounded w-full" value={settings.referralCommissionRates.trainer} onChange={e => setSettings({ ...settings, referralCommissionRates: { ...settings.referralCommissionRates, trainer: parseInt(e.target.value) } })} /></div>
        <div><label>Team Leader Commission (BDT)</label><input type="number" className="border p-2 rounded w-full" value={settings.referralCommissionRates.teamLeader} onChange={e => setSettings({ ...settings, referralCommissionRates: { ...settings.referralCommissionRates, teamLeader: parseInt(e.target.value) } })} /></div>
        <div><label>Senior Team Leader Commission (BDT)</label><input type="number" className="border p-2 rounded w-full" value={settings.referralCommissionRates.seniorTeamLeader} onChange={e => setSettings({ ...settings, referralCommissionRates: { ...settings.referralCommissionRates, seniorTeamLeader: parseInt(e.target.value) } })} /></div>
        <div><label>bKash Number</label><input className="border p-2 rounded w-full" value={settings.paymentMethods.bKash} onChange={e => setSettings({ ...settings, paymentMethods: { ...settings.paymentMethods, bKash: e.target.value } })} /></div>
        <div><label>Nagad Number</label><input className="border p-2 rounded w-full" value={settings.paymentMethods.Nagad} onChange={e => setSettings({ ...settings, paymentMethods: { ...settings.paymentMethods, Nagad: e.target.value } })} /></div>
        <div><label>Rocket Number</label><input className="border p-2 rounded w-full" value={settings.paymentMethods.Rocket} onChange={e => setSettings({ ...settings, paymentMethods: { ...settings.paymentMethods, Rocket: e.target.value } })} /></div>
        <button onClick={updateSettings} className="bg-purple-600 text-white px-6 py-2 rounded">Save All Settings</button>
      </Card>
    </div>
  );
}
