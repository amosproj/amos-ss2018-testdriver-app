package de.fau.cs.osr.amos.asepart;

import org.hibernate.cfg.Configuration;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.SessionFactory;
import org.hibernate.Session;

import de.fau.cs.osr.amos.asepart.entities.*;

public class DatabaseController
{
    private static final SessionFactory factory;

    static
    {
        try
        {
            Configuration configuration = new Configuration().configure();
            configuration.addAnnotatedClass(KeyValueEntry.class);

            configuration.addAnnotatedClass(Account.class);
            configuration.addAnnotatedClass(Admin.class);
            configuration.addAnnotatedClass(User.class);

            //configuration.addAnnotatedClass(Project.class);

            StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder();
            builder.applySettings(configuration.getProperties());
            ServiceRegistry serviceRegistery = builder.build();

            factory = configuration.buildSessionFactory(serviceRegistery);
        }

        catch (Throwable ex)
        {
            System.err.println("Initial SessionFactory creation failed: " + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static Session newSession()
    {
        return factory.openSession();
    }
}