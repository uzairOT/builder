import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

const InteractiveCard = ({ user }) => {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 320,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <Avatar
        src={user.avatar}
        alt={`Avatar of ${user.username}`}
        sx={{ width: 90, height: 90 }}
      />
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {user.username}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            {user.location}
          </Link>
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: 'none' }}
        >
          {user.additionalInfo}
        </Chip>
      </CardContent>
    </Card>
  );
}

export default InteractiveCard;
