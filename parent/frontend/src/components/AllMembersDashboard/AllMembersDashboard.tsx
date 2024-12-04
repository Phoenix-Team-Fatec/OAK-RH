import React from "react";
import './AllMemberDashboard.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels 
);

interface TeamMember {
  teamMemberId: number;
  teamMemberName: string;
  isTeamLeader: boolean;
  joinDate: string;  
}

interface TeamMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: TeamMember[];
}

const AllMemberDashboard: React.FC<TeamMembersModalProps> = ({
  isOpen,
  onClose,
  members,
}) => {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    return `${month}/${day}`;
  };

  // Function to group team members by join date
  const groupMembersByDate = (members: TeamMember[]) => {
    const dateCount: { [key: string]: number } = {};

    members.forEach((member) => {
      const joinDate = new Date(member.joinDate); 
      const formattedDate = formatDate(joinDate);  

      if (dateCount[formattedDate]) {
        dateCount[formattedDate]++;
      } else {
        dateCount[formattedDate] = 1;
      }
    });

    return dateCount;
  };

  // Group the members by their join date
  const dateCount = groupMembersByDate(members);
  const dateLabels = Object.keys(dateCount);  
  const memberCounts = Object.values(dateCount);  

  // Data for the bar chart
  const chartData = {
    labels: dateLabels,
    datasets: [
      {
        label: 'Membros',
        data: memberCounts,
        backgroundColor: '#177035', 
        borderWidth: 1,
        datalabels: {
          align: 'top', // Align the data labels on top of the bars
          color: 'white', // Set the color of the labels (white in this case)
          font: {
            weight: 'bold', // Make the font bold
            size: 14, // Set the font size
          },
        },
      },
    ],
  };

  // Options for the bar chart
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Quantidade de Membros',
      },
      // Enable the data labels plugin
      datalabels: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="team-members-modal-overlay">
      <div className="team-members-modal-container">
        <div className="team-members-modal-header">
          <h2>Membros da Equipe</h2>
          <button className="team-members-modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="team-members-modal-content">
          <div className="bar-chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
          {members.length > 0 ? (
            <ul className="team-members-list">
              {members.map((member) => (
                <li key={member.teamMemberId} className="team-member-item">
                  <strong>{member.teamMemberName}</strong> -{" "}
                  {member.isTeamLeader ? "Líder" : "Liderado"}
                </li>
              ))}
            </ul>
          ) : (
            <p>Não há membros nesta equipe.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMemberDashboard;
