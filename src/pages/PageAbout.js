/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { Button, Collapse } from 'react-bootstrap';

import Header from '../components/Header';
import arrowright from '../assets/arrowright.png';
import arrowdown from '../assets/arrowdown.png';

const pageAboutStyle = css`
  margin: 0 auto;

  a {
    color: #bd574e;
  }

  button {
    background: none;
    border: none;
    box-shadow: none;
    outline: none;
    color: #545353;
    cursor: pointer;
    text-align: left;
    font-family: 'apercu';
    font-size: 24px;

    &:hover {
      background: none;
      border: none;
      box-shadow: none;
      outline: none;
      color: #545353;
    }

    &:focus {
      background: none;
      border: none;
      box-shadow: none;
      outline: none;
      color: #545353;
    }

    &:active {
      background: none !important;
      border: none;
      box-shadow: none !important;
      outline: none;
      color: #545353 !important;
    }
  }

  .closedTab {
    &:before {
      background-image: url(${arrowright});
      background-size: 13px 20px;
      background-repeat: no-repeat;
      background-position: left center;
      display: inline-block;
      width: 30px;
      height: 20px;
      content: '';
    }
  }

  .openTab {
    color: #bd574e !important;
    &:before {
      background-image: url(${arrowdown});
      background-size: 20px 13px;
      background-repeat: no-repeat;
      background-position: left center;
      display: inline-block;
      width: 30px;
      height: 20px;
      content: '';
    }
  }

  .content {
    margin-left: 42px;
  }

  .question {
    margin-bottom: 5px;
    font-family: 'apercu';
  }

  .answer {
    margin-bottom: 25px;
    font-family: 'apercu-light';
  }
`;

export default class PageAbout extends Component {
  // Handle whether collapsible tabs are open
  constructor(props) {
    super(props);
    this.state = {
      open: [false, false, false, false, false],
    };
  }

  // Toggles whether collapsible tab is open
  toggle = tab => {
    let state = this.state.open;
    state[tab] = !state[tab];
    this.setState({
      open: state,
    });
  };

  render() {
    return (
      <div className="PageAbout" css={pageAboutStyle}>
        <Header>FAQ</Header>
        <br />
        <Button
          className={this.state.open[0] ? 'openTab' : 'closedTab'}
          onClick={() => this.toggle(0)}
        >
          About Datamatch
        </Button>
        <Collapse in={this.state.open[0]}>
          <div className="content">
            <div className="question">
              What exactly is Datamatch? Without the jokes, please.
            </div>
            <div className="answer">
              Datamatch is a free matchmaking service created for college
              students by college students to find true love. In 1994, the
              Harvard Computer Society began the program, originally meant for
              Harvard students — but as of recently, Datamatch has now spread to
              over twelve schools, with plans to expand to more! Take our survey
              and leave it to us and our top secret Algorithm™ to find you true
              love. This is primarily meant to be humorous and casual, but
              there's always a chance of finding a lasting relationship. It has
              become a Harvard Valentine's Day tradition, with over 80% of the
              student body annually signing up. If you are curious about
              enrolling, you can read more in the FAQ answer "The Process."
            </div>
            <div className="question">
              Thank god, I'm so lonely! Can I participate in Datamatch?
            </div>
            <div className="answer">
              If cuffing season didn't do you right, we're here to help! If you
              are a student with a school email account at these schools, we'd
              love to have you participate:
              <ul>
                <li>Harvard College</li>
                <li>Boston College</li>
                <li>Brown University</li>
                <li>Carleton College</li>
                <li>The University of Chicago</li>
                <li>The Claremont Colleges</li>
                <li>Columbia University</li>
                <li>Cornell University</li>
                <li>Harvey Mudd College</li>
                <li>Massachusetts Institute of Technology</li>
                <li>Wellesley College</li>
                <li>University of Wisconsin-Madison</li>
                <li>Washington University in St. Louis</li>
                <li>Yale</li>
              </ul>
            </div>
            <div className="question">
              I'm not a student at one of these schools. Is there any way I can
              take the survey?
            </div>
            <div className="answer">
              We know, we love spreading love, and heaven knows your campus
              needs more of it. We know how it feels. We're trying our best to
              expand, but haven't quite gotten to your school yet. Sorry,
              booboo. But do see the next question!
            </div>
            <div className="question">
              I'd like to bring Datamatch to [insert institution for make people
              much smart here]. How do?
            </div>
            <div className="answer">
              Ooh! Ooh! We did that! And maybe we could do more of that! Sharing
              the joy of Datamatch is a high priority for us. Just contact the{' '}
              <a href="mailto:hcsdatamatch@gmail.com">development team</a> or{' '}
              <a href="mailto:hcs-board@hcs.harvard.edu">HCS</a> directly and we
              can work something out. Preferred modes of communication include
              telegram and snail mail (use of real snails encouraged).
            </div>
            <div className="question">
              Technically I'm a student for some reason or another, but I'm not
              actually on campus now (or maybe ever). Can I still sign up?
            </div>
            <div className="answer">
              Yes, you can! As long as you have a valid email from one of our
              schools and can sign in through, you're eligible to sign up.
            </div>
            <div className="question">
              Okay, I'm not a student, but I'm an alumni. Can I still sign up?
            </div>
            <div className="answer">
              Oh, you graduated? Weird flex, but okay. See above, if you have
              your email, then go right ahead in signing up.
            </div>
            <div className="question">
              So you keep saying “Matchmaking excellence since 1994.” And you
              also keep saying 2019 is the 24th Datamatch. But hold on a
              second...
            </div>
            <div className="answer">
              Oof. Yeah, math. We're not so great. But actually! The 1997
              Datamatch was cancelled after an incident involving our server
              systems, three bottles of Chardonnay, an unwise dare, and a pair
              of women’s pantyhose. We don’t like to talk about it.
            </div>
            <div className="question">
              I love Datamatch soooooo much! Is there any way I can get
              involved?
            </div>
            <div className="answer">
              Join us! Join us! In the spirit of the Datamatch (cult)ure, we're
              always looking for a new (cough)sacrifice(cough), I mean new
              member for the team! The main development cycle is during the fall
              and early spring, but send an{' '}
              <a href="mailto:hcsdatamatch@gmail.com">email</a> and we'll see
              what we can do.
            </div>
            <div className="question">
              What's your legal policy? Fair use policy?
            </div>
            <div className="answer">
              Here's our expanded legal policy:
              <br />
              <br />
              No purchase necessary. Void in wacko states like Ohio and Michigan
              and where prohibited by law. Keep out of reach of children.
              Datamatch not liable for negligible use, unless consequences were
              good. Wait 2 hours after breaking up to use. Do not combine with
              alcohol. Do not operate heavy machinery while under the effects of
              Datamatch. Any views or opinions expressed therein are completely
              hilarious. Datamatch is provided as is without warranty. Copyright
              1636.
              <br />
              <br />
              Otherwise, our current team policy, and the one we hope all
              Datamatch users will abide by is, "BE A GOOD PERSON." As for fair
              use, consider all users to receive a free permit from us.
            </div>
          </div>
        </Collapse>

        <Button
          className={this.state.open[1] ? 'openTab' : 'closedTab'}
          onClick={() => this.toggle(1)}
        >
          The Process
        </Button>
        <Collapse in={this.state.open[1]}>
          <div className="content">
            <div className="question">
              When does the survey open? When do results come out?
            </div>
            <div className="answer">
              The survey opens at 12:01 AM EST on February 7th; the survey then
              closes a week later, on Valentine's Day at 12:01 AM EST. Results
              come out in the early morning: stay posted!
            </div>
            <div className="question">
              I'm still a bit confused. What exactly do I have to do?
            </div>
            <div className="answer">
              Just register and login using your college email, fill out your
              basic user info, our specially designed survey, and wait until
              February 14th for results to come up! Afterwards, contact your
              matches in whatever way you'd like, doing anything from signing up
              for free meals* to nothing at all. We certainly hope you won't do
              nothing, though, and will trust the system...
              <br />
              <br />
              *Free meals currently available at Harvard only, everyone else,
              y'all gotta use some more of your college loan.
            </div>
            <div className="question">Free meals? Explain how!</div>
            <div className="answer">
              Datamatch can be exchanged for{' '}
              <a
                href="https://youtu.be/dgct3Jn8pFA?t=8"
                target="_blank"
                rel="noopener noreferrer"
              >
                goods and services
              </a>
              .
              <br />
              <br />
              That is to say, if you're at Harvard (other colleges, coming soon)
              and are eligibly matched with someone, Datamatch, through a
              partnership with local restaurants, will provide a free meal for
              you to meet. All you have to do is toggle the meal button and hope
              they toggle it, too! Warning: that button is one-way only, so only
              click if you're certain! Once both people in a match have toggled,
              an email will be sent out with further instructions that will
              guide you on claiming your free meal. You'll have to wait or
              convince the other person if they haven't toggled yet.
              <br />
              <br />
              Note this is only currently available at Wellesley and Harvard;
              sorry!
            </div>
            <div className="question">
              Okay, done. I'm the best at Datamatch. The Very Best. Everyone
              matches with me, even the haters and losers. Now what?
            </div>
            <div className="answer">
              Now you'll have to select your location! Alert: you HAVE TO select
              your location before you can go out for a meal. We'll send you
              instructions and a confirmation of a time at any eligible
              restaurant, but you yourself need to navigate to your "Results"
              page first and select a location first. Either person in a pair
              can select the location, as long as someone does it!
            </div>
            <div className="question">
              I have the attention span of a Yale student.
            </div>
            <div className="answer">tl;dr: Take survey; free food.</div>
            <div className="question">
              I have the reading comprehension of a 13th century peasant. In
              fact, I am one.
            </div>
            <div className="answer">
              When did the 13th century get internet...? And how did...? Anyway,
              if you're still confused,{' '}
              <a href="mailto:hcsdatamatch@gmail.com">email us</a>, and a team
              member will be readily available to answer questions.
            </div>
            <div className="question">
              I'm in a relationship, but I'd really love to participate. Is
              there a way to tell people I'm not romantically available?
            </div>
            <div className="answer">
              Yes! We have a "platonic" option that you can specify, meaning you
              just want to meet new friends. You'll only be matched with other
              platonic users, or users who specify that they don't care, with
              matches in the latter case being explicitly labeled platonic.
            </div>
            <div className="question">
              How do these "Matches" in the Search feature work?
            </div>
            <div className="answer">
              Despite our algorithm’s stated perfection, we still allow you to
              have a little control over your destiny. To prevent spamming match
              requests, the number of search-originated matches you can make is
              limited. What happens if there’s mutual interest? That's up to the
              both of you to interpret... we won't tell you how to manage your
              personal relationships. (Most of the time.)
            </div>
            <div className="question">
              What happens to my information? Is it private?
            </div>
            <div className="answer">
              Don't worry, we don't share your information with Facebook!! The
              Datamatch team personally touches your information only as much as
              is necessary to develop the Algorithm™ and resolve user issues.
              That promise extends to dating and social network information as
              well. We may collect some anonymous stats like usage statistics,
              but your name and contact info will be completely separate from
              such reports.
            </div>
          </div>
        </Collapse>
        <Button
          className={this.state.open[2] ? 'openTab' : 'closedTab'}
          onClick={() => this.toggle(2)}
        >
          The Survey
        </Button>
        <Collapse in={this.state.open[2]}>
          <div className="content">
            <div className="question">
              Who wrote these questions? They're so funny!
            </div>
            <div className="answer">We stole them from fortune cookies.</div>
            <div className="question">
              Who wrote these questions? They're so boring!
            </div>
            <div className="answer">
              We stole those from fortune cookies too.
            </div>
            <div className="question">
              I want to read this year's questions without taking part in the
              survey. Is that possible?
            </div>
            <div className="answer">No.</div>
            <div className="question">
              Pleeeeeeassseeeeee? My mom won't let me sign up, or else I'm
              grounded...
            </div>
            <div className="answer">
              Well, if, for what we can only assume is some apocalypse-related
              reason, you can't complete your signup, there's no penalty for
              logging in but only reading the questions. However, once you've
              finished scrolling to the bottom, the button to submit is right
              there anyway...do you really want to miss out on a defining
              experience of your college career? True love only comes along
              every so often...
            </div>
            <div className="question">
              But what if I'm not a student of a participating college and also
              want to see the questions. How can I do that?
            </div>
            <div className="answer">
              Feel free to contact us directly! Just send us an email with a
              suitably introductory text and a small sacrifice, and we can send
              them to you free of charge. We only ask for your firstborn child,
              though your secondborn is acceptable.
            </div>
            <div className="question">
              Hey, I have a great idea for a new question! "Show that if A-hat
              is Hermitian, then the exponential of i times A-hat is unitary." I
              think it's a perfect joke, and ideally you would post answers by
              Friday at 5:00 P.M.
            </div>
            <div className="answer">
              Can't help you here, since we learned all our science from{' '}
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </div>
            <div className="question">
              I remember this hilarious question I'd like to see again from a
              previous Datamatch. How can I do that?
            </div>
            <div className="answer">
              A shelved feature for this year was the ability to view past
              archives. In lieu of that, you can just email the Datamatch team
              directly and we'll be able to help you find the questions you
              want.
            </div>
          </div>
        </Collapse>
        <Button
          className={this.state.open[3] ? 'openTab' : 'closedTab'}
          onClick={() => this.toggle(3)}
        >
          The Algorithm / Results
        </Button>
        <Collapse in={this.state.open[3]}>
          <div className="content">
            <div className="question">
              Let's just get straight to it. Is the Algorithm™ random?
            </div>
            <div className="answer">It can be anything you want it to be.</div>
            <div className="question">
              Okay, I get it. It's "proprietary artificial intelligence." *wink
              wink*
            </div>
            <div className="answer">
              No, really! Though in the past less scrupulous HCS members have
              resorted to rolling 20-sided dice and examining the entrails of
              slaughtered animals, the modern Datamatch is fundamentally rooted
              in strong data analysis.
            </div>
            <div className="question">Right...</div>
            <div className="answer">
              Well, it's still up to you whether to believe us or not. If you
              would like to know more, we're always looking for new members to
              help with programming and data analysis. Just shoot us an email!
            </div>
            <div className="question">So how accurate are these results?</div>
            <div className="answer">
              Extremely. But though we can play Cupid, we can't play God! It's
              up to you to contact your matches, and actually make something
              happen. ""You miss 100% of the shots you don't take." - Wayne
              Gretzky" - Michael Scott.
            </div>
            <div className="question">
              What happened to that big shape thingy that you had last year?
            </div>
            <div className="answer">
              We used to show a diagram of personality profiles to give you a
              sense of compatibility in matches across categories, but all you
              big-brained tuition-paying college students apparently can't read
              graphs. Don't worry, now results will just be more of a
              ~*mystery*~. Also, maybe take a math class sometime soon. Looking
              at you, humanities majors.
            </div>
            <div className="question">
              I'm a senior, will I get matched with any of those stinkin'
              underclassmen?
            </div>
            <div className="answer">
              We take into account your class year through the Algorithm™, so
              generally you'll be matched with someone in or around your year.
              This includes grad students and alumni, who are also solely
              matched with each other (in most cases). We understand: we don't
              like those icky freshmen either. Even the person who's writing
              this FAQ, who is a freshman.
            </div>
            <div className="question">
              I don't like my results. What can I do about it?
            </div>
            <div className="answer">
              What can you do about it? What can any of us do about it? Maybe
              don't let the existential dread get you today; go out there and
              get a free meal.
            </div>
            <div className="question">
              I toggled for free food with my matches, but they haven't done it
              back yet. Are you sure they're my perfect match?
            </div>
            <div className="answer">
              Of course they are. Are you calling us liars? Fake news!
            </div>
            <div className="question">
              We went out for free food and had a great time and now we're best
              friends! We love you, Datamatch!
            </div>
            <div className="answer">We love you, too. :)</div>
          </div>
        </Collapse>
        <Button
          className={this.state.open[4] ? 'openTab' : 'closedTab'}
          onClick={() => this.toggle(4)}
        >
          General Help
        </Button>
        <Collapse in={this.state.open[4]}>
          <div className="content">
            <div className="question">
              AHH! AHH! AHHHHHH! SOMETHING BROKE! AHHHHHHH!
            </div>
            <div className="answer">
              Okay, first: calm down. Next: let's work together to{' '}
              <a
                href="https://youtu.be/LinpRhB4aWU?t=19"
                target="_blank"
                rel="noopener noreferrer"
              >
                diagnose
              </a>{' '}
              the problem. Have you tried refreshing the page a couple times?
              What about logging out and logging back in? Incognito mode is nice
              too. *wink* If all else fails, email us and we'll be happy to help
              on a case by case basis.
            </div>
            <div className="question">
              I'm an alum, but I don't have a email from these schools. Is there
              a way for me to sign up?
            </div>
            <div className="answer">
              Not without our help, unfortunately. But luckily, we're here to
              help! If you contact us directly, then we can help get you in the
              system.
            </div>
            <div className="question">
              I identify as queer, trans, or some other non-binary gender, or as
              a sexuality not listed. How can I represent this in my profile?
            </div>
            <div className="answer">
              We try to be as inclusive as possible of all genders and
              sexualities as possible, and have added features to reflect this
              inclusivity. We listened to feedback from the community to draft a{' '}
              <a
                href="https://datamatch.me/gender_policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                matching policy
              </a>{' '}
              that is inclusive of all gender identities. Nevertheless, if you
              do have any comments or suggestions, we encourage all/any feedback
              toward the current policy. Please contact us at{' '}
              <a href="mailto:hcsdatamatch@gmail.com">hcsdatamatch@gmail.com</a>
              , or comment on our Facebook page.
            </div>
            <div className="question">
              I'm having an issue with submitting my information or survey
              answers, as well as load times.
            </div>
            <div className="answer">
              When Datamatch initially opens, we're often flooded by log-ins.
              Try signing back in at a later time, when the load is lower.
            </div>
            <div className="question">
              I've changed my mind about some of the information or settings I'm
              providing, but the registration period has closed. What can I do?
            </div>
            <div className="answer">
              Just email us, and we'll manually change it for you!
            </div>
            <div className="question">
              I made an account and I signed up, but now I want to delete it.
              How can I do this?
            </div>
            <div className="answer">
              Just email us at{' '}
              <a href="mailto:hcsdatamatch@gmail.com">hcsdatamatch@gmail.com</a>{' '}
              before February 14th and we'll have it covered. Just know that
              every time an account is deleted, the algorithm sheds a single
              solitary tear at your absence, as if a miracle was interrupted.
            </div>
            <div className="question">
              I'm getting weird error output on the page, or messages like
              "Failed to load."
            </div>
            <div className="answer">
              Sorry, we were using some of our spare CPU power to mine Bitcoin.
              Let us know what the error/message was, what time it occurred,
              what you were doing when the error occurred, and we'll look into
              it.
            </div>
            <div className="question">
              My browser is giving me ugly formatting, and I'm having trouble
              logging in. What gives?
            </div>
            <div className="answer">
              Some old versions of browsers, especially Safari and Internet
              Explorer, are known to have issues with the Datamatch website. Try
              switching to Chrome or Firefox or updating your browser version
              and seeing if that resolves the issue; if not, contact us.
            </div>
            <div className="question">I'm having issues on my phone.</div>
            <div className="answer">
              Sounds like a personal problem. Maybe try using a real computer.
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}
