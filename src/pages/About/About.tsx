import './About.css';
import bioImg from '../../assets/img/bio.jpeg'

const About = () => {
  return (
    <div className="About">
      <h2 className="About__title">Über den Blog</h2>
      <p>
        Mein Name ist Angélique .Bereits 28 Jahre verbrachte ich auf dieser Erde. Viel Zeit davon verbrachte ich mit einer endlosen Suche nach dem, was die Welt wohl zusammen hält, nach dem Geheimnis dieser Welt. Mit vielen Bemühungen habe ich versucht, wenigstens ein kleines bisschen der Wahrheit näher zu kommen, die sich hinter all den Dingen verbirgt. Mal mehr und mal weniger erfolgreich. Mit jedem Jahr weiterer Lebenserfahrung offenbarte sie sich mir mehr und mehr und ich öffnete immer mein Herz für diese Wahrheit. Doch dies ist ein langer, nie endener Weg mit vielen Verirrungen und Lichtblicken, mit Stürzen und Triumphen und nie endenen Mühen. Aber die Früchte dessen sind wunderbar!
      </p>
      <div className="img-wrap">
        <img src={bioImg} alt="" />
      </div>
      <p>
        Ich denke jeder Mensch hat in seinem Herzen das tiefe Bedürfnis den Dingen auf den Grund zu gehen, zu forschen und herauszufinden, was wirklich wahr ist und was dem Menschen und seinen Beziehungen wirklich gut tut und zu einem vollkommenen Leben verhilft. Dabei wird sich jeder sicherlich auf die Themengebiete fokussieren, die seinen Neigungen, Interessen und Talten am ehesten entsprechen. Auf dem Weg zu Erkenntnissen begegnen wir unendlich vielen inspirierenden und erstaunlichen Dingen. Gleichzeitig wird der suchende Mensch in manchen Punkten feststellen müssen, wie weit entfernt die Realität und menschengemachte Systeme von dem Wahren, Guten und Schönem sind. Auf diesem Weg und auch mit wachsender Lebenserfahrung sammeln wir alle einen kleinen Schatz von inspirierenden und erbaulichen Dingen, vor allem an Erkenntnissen und wegweisendem Gedankengut bzw. Anregungen und Impulsen. Um meinen Kopf davon zu befreien möchte ich diesen kleinen Blog verfassen und all die Inhalte oder Entdeckungen festhalten, die mich in letzter Zeit bewegten. Es ist wie ein Art Sammlung von Erkenntissreichem und Interessantem für mich, aber vor allem eine Art Selbstausdruck. Ich möchte den ganzen aufgenommenen Impulsen und meinen daraus entstandenden Gedanken einen Raum geben, alles mich Bewegende niederschreiben und eine gewisse Struktur meiner Gedankenwelt erlangen. Vielleicht wird das niemanden jucken, aber womöglich kann doch die ein oder andere Person wenigstens ein paar Anregungen und Impulse bekommen. Ich würde mich von Herzen freuen! :)
      </p>
    </div>
  );
};

export default About